/**
 * scripts/index-wiki.mjs
 *
 * Chunks wiki articles and uploads them to Cloudflare Vectorize.
 * Run once after Vectorize is created, and again whenever wiki content changes.
 *
 * Prerequisites:
 *   1. wrangler login (run once)
 *   2. wrangler vectorize create wasimi-wiki --dimensions=384 --metric=cosine
 *   3. Set CLOUDFLARE_ACCOUNT_ID in your shell (from CF dashboard)
 *
 * Usage:
 *   node scripts/index-wiki.mjs
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT     = dirname(fileURLToPath(import.meta.url)) + '/..'
const CONTENT  = JSON.parse(readFileSync(join(ROOT, 'src/data/wiki-content.json'), 'utf8'))
const CHUNK_SZ = 300  // target words per chunk
const OVERLAP  = 40   // word overlap between adjacent chunks

// ── Chunk a string into overlapping word-window segments ──────────────────────
function chunk(text, size = CHUNK_SZ, overlap = OVERLAP) {
  const words  = text.split(/\s+/)
  const chunks = []
  let i = 0
  while (i < words.length) {
    chunks.push(words.slice(i, i + size).join(' '))
    i += size - overlap
  }
  return chunks
}

// ── Build all vectors from the wiki content file ──────────────────────────────
function buildVectors() {
  const vectors = []
  for (const topic of CONTENT) {
    for (const article of topic.articles) {
      const segments = chunk(article.content)
      segments.forEach((text, idx) => {
        vectors.push({
          id:       `${article.id}-${idx}`,
          text,
          metadata: {
            topic:    topic.title,
            topicId:  topic.id,
            title:    article.title,
            chunkIdx: idx,
          },
        })
      })
    }
  }
  return vectors
}

// ── Upload to Vectorize via Cloudflare REST API ───────────────────────────────
async function uploadToVectorize(vectors) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken  = process.env.CLOUDFLARE_API_TOKEN
  const indexName = 'wasimi-wiki'

  if (!accountId || !apiToken) {
    console.error('❌  Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN env vars.')
    process.exit(1)
  }

  // Vectorize insert-by-text endpoint (embeddings generated server-side)
  // This uses the insert-by-text feature: https://developers.cloudflare.com/vectorize/
  const BATCH = 100
  let inserted = 0

  for (let i = 0; i < vectors.length; i += BATCH) {
    const batch = vectors.slice(i, i + BATCH)

    // Vectorize insert-by-values requires pre-computed embeddings.
    // We use the CF AI REST endpoint to embed each chunk first.
    const embeddings = await Promise.all(batch.map(async v => {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/baai/bge-small-en-v1.5`,
        {
          method:  'POST',
          headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
          body:    JSON.stringify({ text: [v.text] }),
        }
      )
      const data = await res.json()
      if (!data.success) throw new Error(JSON.stringify(data.errors))
      return { ...v, values: data.result.data[0] }
    }))

    const payload = embeddings.map(v => ({
      id:       v.id,
      values:   v.values,
      metadata: { ...v.metadata, text: v.text },
    }))

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes/${indexName}/upsert`,
      {
        method:  'POST',
        headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ vectors: payload }),
      }
    )
    const data = await res.json()
    if (!data.success) throw new Error(JSON.stringify(data.errors))

    inserted += batch.length
    console.log(`  ↑  ${inserted}/${vectors.length} chunks uploaded`)
  }
}

async function main() {
  console.log('📚  Building wiki chunks from src/data/wiki-content.json …')
  const vectors = buildVectors()
  console.log(`    ${vectors.length} chunks from ${CONTENT.reduce((n, t) => n + t.articles.length, 0)} articles across ${CONTENT.length} topics`)
  console.log('⬆️   Uploading to Cloudflare Vectorize …')
  await uploadToVectorize(vectors)
  console.log('✅  Wiki indexed. Ready for AI search.')
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
