import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = import.meta.dirname

// Pick generated (Ghost-fetched) JSON if it exists, otherwise static fallback.
// Evaluated once at build/dev-start — no API key ever enters the browser bundle.
const pick = (generated, fallback) =>
  existsSync(join(root, generated))
    ? join(root, generated)
    : join(root, fallback)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@content/articles': pick('src/generated/articles.json', 'src/data/fallback/articles.json'),
      '@content/settings': pick('src/generated/settings.json', 'src/data/fallback/settings.json'),
      '@content/wiki':     join(root, 'src/data/fallback/wiki-topics.json'),
    },
  },
})
