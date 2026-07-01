/**
 * scripts/fetch-content.mjs
 *
 * Run before `vite build` by the CI pipeline (Cloudflare Pages).
 * Fetches content from Ghost CMS using build-time env secrets.
 * Writes to src/generated/ (gitignored) — secrets NEVER touch the browser bundle.
 *
 * If Ghost is unreachable, the generated/ directory is left empty and
 * vite.config.js aliases fall back to src/data/fallback/ automatically.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT  = join(ROOT, 'src', 'generated')
const FB   = join(ROOT, 'src', 'data', 'fallback')

mkdirSync(OUT, { recursive: true })

const GHOST_URL = process.env.GHOST_URL
const GHOST_KEY = process.env.GHOST_KEY

function formatDate(iso) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    .toUpperCase()
}

async function fetchArticles() {
  const res = await fetch(
    `${GHOST_URL}/ghost/api/content/posts/` +
    `?key=${GHOST_KEY}&limit=30&include=tags` +
    `&fields=id,slug,title,excerpt,custom_excerpt,published_at,tags,featured`
  )
  if (!res.ok) throw new Error(`Ghost /posts returned HTTP ${res.status}`)

  const { posts } = await res.json()
  return posts.map((p, i) => ({
    id:      p.id,
    slug:    p.slug,
    tag:     p.tags?.[0]?.name ?? 'Journal',
    date:    formatDate(p.published_at),
    title:   p.title,
    excerpt: p.custom_excerpt || p.excerpt || '',
    wide:    i === posts.length - 1 && posts.length > 4,
  }))
}

async function fetchSettings() {
  const res = await fetch(
    `${GHOST_URL}/ghost/api/content/settings/?key=${GHOST_KEY}`
  )
  if (!res.ok) throw new Error(`Ghost /settings returned HTTP ${res.status}`)

  const { settings } = await res.json()
  return {
    siteTagline: settings.description || 'A house of worship and gathering under EGFM',
    journalIssue: 14,
  }
}

async function main() {
  if (!GHOST_URL || !GHOST_KEY) {
    console.log('ℹ  GHOST_URL / GHOST_KEY not set — skipping fetch, build uses fallback content.')
    console.log('   Add these as Build Environment Variables in Cloudflare Pages when Ghost is live.')
    return
  }

  try {
    console.log(`📡  Fetching from ${GHOST_URL} …`)
    const [articles, settings] = await Promise.all([fetchArticles(), fetchSettings()])

    writeFileSync(join(OUT, 'articles.json'), JSON.stringify(articles, null, 2))
    writeFileSync(join(OUT, 'settings.json'), JSON.stringify(settings, null, 2))

    console.log(`✅  ${articles.length} articles fetched and written to src/generated/`)
  } catch (err) {
    console.warn(`⚠  Ghost fetch failed: ${err.message}`)
    console.warn('   Build will continue with fallback content from src/data/fallback/')
  }
}

main()
