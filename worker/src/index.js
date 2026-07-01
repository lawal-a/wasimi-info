/**
 * Wasimi API Worker
 *
 * Proxies Ghost Content API so the browser never sees the API key.
 * Deploy: cd worker && wrangler deploy
 * Secrets: wrangler secret put GHOST_URL  (e.g. https://cms.wasimi.yourdomain.com)
 *          wrangler secret put GHOST_KEY  (Ghost Content API key)
 *
 * Routes:
 *   GET /api/articles  → Ghost posts
 *   GET /api/settings  → Ghost site settings
 */

const CACHE_TTL = 300 // 5 minutes

function cors(env) {
  return {
    'Access-Control-Allow-Origin':  env.ALLOWED_ORIGIN ?? '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function formatDate(iso) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    .toUpperCase()
}

async function ghostFetch(env, path, cache) {
  const url = `${env.GHOST_URL}/ghost/api/content/${path}&key=${env.GHOST_KEY}`
  const cacheKey = new Request(url)

  const cached = await cache.match(cacheKey)
  if (cached) return cached.clone()

  const res  = await fetch(url)
  const body = new Response(res.body, res)
  body.headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`)
  await cache.put(cacheKey, body.clone())
  return body
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    const headers = cors(env)

    if (request.method === 'OPTIONS') return new Response(null, { headers })

    const cache = caches.default

    if (pathname === '/api/articles') {
      const res  = await ghostFetch(env,
        'posts/?limit=30&include=tags&fields=id,slug,title,excerpt,custom_excerpt,published_at,tags,featured',
        cache
      )
      const { posts } = await res.json()

      const articles = posts.map((p, i) => ({
        id:      p.id,
        slug:    p.slug,
        tag:     p.tags?.[0]?.name ?? 'Journal',
        date:    formatDate(p.published_at),
        title:   p.title,
        excerpt: p.custom_excerpt || p.excerpt || '',
        wide:    i === posts.length - 1 && posts.length > 4,
      }))

      return new Response(JSON.stringify(articles), {
        headers: { ...headers, 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_TTL}` },
      })
    }

    if (pathname === '/api/settings') {
      const res  = await ghostFetch(env, 'settings/?', cache)
      const { settings } = await res.json()

      return new Response(JSON.stringify({
        siteTagline: settings.description || 'A house of worship and gathering under EGFM',
        journalIssue: 14,
      }), {
        headers: { ...headers, 'Content-Type': 'application/json' },
      })
    }

    return new Response('Not found', { status: 404, headers })
  },
}
