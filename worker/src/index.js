/**
 * Wasimi API Worker
 *
 * Routes:
 *   GET  /api/articles        Ghost CMS posts (proxied, key never in browser)
 *   GET  /api/settings        Ghost site settings
 *   POST /api/ask             AI wiki Q&A (embed → Vectorize → LLM)
 *
 * Deploy:  cd worker && wrangler deploy
 *
 * Secrets (set via `wrangler secret put <NAME>`):
 *   GHOST_URL       e.g. https://cms.wasimi.yourdomain.com
 *   GHOST_KEY       Ghost Content API key (read-only)
 *   OLLAMA_URL      e.g. http://homelab-ip:11434  (only if USE_OLLAMA=true)
 *
 * Bindings (set in wrangler.toml or Cloudflare dashboard):
 *   AI              Cloudflare Workers AI
 *   VECTORIZE       Cloudflare Vectorize index "wasimi-wiki"
 */

const CACHE_TTL = 300

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin':  env.ALLOWED_ORIGIN ?? '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(data, env, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(env), 'Content-Type': 'application/json' },
  })
}

// ── Ghost helpers ─────────────────────────────────────────────────────────────

function formatDate(iso) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    .toUpperCase()
}

async function ghostGet(env, path, cache) {
  const url      = `${env.GHOST_URL}/ghost/api/content/${path}&key=${env.GHOST_KEY}`
  const cacheKey = new Request(url)
  const cached   = await cache.match(cacheKey)
  if (cached) return cached.clone()

  const res  = await fetch(url)
  const body = new Response(res.body, res)
  body.headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`)
  await cache.put(cacheKey, body.clone())
  return body
}

// ── AI wiki Q&A ──────────────────────────────────────────────────────────────

async function handleAsk(request, env) {
  let query
  try {
    ({ query } = await request.json())
  } catch {
    return json({ error: 'Body must be JSON with a "query" field.' }, env, 400)
  }
  if (!query?.trim()) return json({ error: 'query is empty' }, env, 400)

  // 1. Embed the query
  const embedResult = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
    text: [query.trim()],
  })
  const queryVector = embedResult.data[0]

  // 2. Search Vectorize
  const search = await env.VECTORIZE.query(queryVector, {
    topK:           4,
    returnMetadata: 'all',
  })

  const chunks = search.matches.map(m => ({
    topic: m.metadata.topic,
    title: m.metadata.title,
    text:  m.metadata.text,
    score: m.score,
  }))

  const context = chunks.map(c => `[${c.topic} — ${c.title}]\n${c.text}`).join('\n\n---\n\n')

  const systemPrompt = `You are a warm, knowledgeable guide for Wasimi — a sacred building under construction belonging to EGFM (Eternal Glory Family Ministries) in Ogun State, Nigeria. Answer the visitor's question using only the context provided. Be concise, warm, and plain-spoken — one or two short paragraphs at most. If the context does not contain enough information to answer, say so honestly and suggest they use the Involve page to reach the team directly.`

  let answer

  if (env.USE_OLLAMA === 'true' && env.OLLAMA_URL) {
    // ── Homelab Ollama (swap-in) ─────────────────────────────────────────────
    const res = await fetch(`${env.OLLAMA_URL}/api/chat`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        model:  env.OLLAMA_MODEL ?? 'llama3',
        stream: false,
        messages: [
          { role: 'system',    content: systemPrompt },
          { role: 'user',      content: `Context:\n${context}\n\nQuestion: ${query}` },
        ],
      }),
    })
    const data = await res.json()
    answer = data.message?.content ?? data.response ?? 'No response from model.'
  } else {
    // ── Cloudflare Workers AI (default, free tier) ───────────────────────────
    const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: `Context:\n${context}\n\nQuestion: ${query}` },
      ],
      max_tokens: 400,
    })
    answer = result.response
  }

  return json({
    answer,
    sources: chunks
      .filter((c, i, arr) => arr.findIndex(x => x.title === c.title) === i) // dedupe
      .map(c => ({ topic: c.topic, title: c.title })),
  }, env)
}

// ── Main fetch handler ────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    const headers = corsHeaders(env)

    if (request.method === 'OPTIONS') return new Response(null, { headers })

    const cache = caches.default

    // Articles
    if (pathname === '/api/articles' && request.method === 'GET') {
      const res     = await ghostGet(env, 'posts/?limit=30&include=tags&fields=id,slug,title,excerpt,custom_excerpt,published_at,tags', cache)
      const { posts } = await res.json()
      return json(posts.map((p, i) => ({
        id:      p.id,
        slug:    p.slug,
        tag:     p.tags?.[0]?.name ?? 'Journal',
        date:    formatDate(p.published_at),
        title:   p.title,
        excerpt: p.custom_excerpt || p.excerpt || '',
        wide:    i === posts.length - 1 && posts.length > 4,
      })), env)
    }

    // Settings
    if (pathname === '/api/settings' && request.method === 'GET') {
      const res = await ghostGet(env, 'settings/?', cache)
      const { settings } = await res.json()
      return json({
        siteTagline: settings.description || 'A house of worship and gathering under EGFM',
        journalIssue: 14,
      }, env)
    }

    // AI wiki Q&A
    if (pathname === '/api/ask' && request.method === 'POST') {
      return handleAsk(request, env)
    }

    return new Response('Not found', { status: 404, headers })
  },
}
