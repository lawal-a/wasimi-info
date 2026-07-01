/**
 * Single import point for all CMS content.
 * Aliases are resolved by vite.config.js at build time —
 * picks Ghost-generated JSON if present, otherwise fallback.
 * No secrets, no API calls in the browser.
 */
import articles  from '@content/articles'
import settings  from '@content/settings'
import wikiTopics from '@content/wiki'

export { articles, settings, wikiTopics }
