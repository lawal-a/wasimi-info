import { useState } from 'react'
import SvgDefs from './components/icons/SvgDefs'
import Spine from './components/Spine'
import Home from './pages/Home'
import Magazine from './pages/Magazine'
import Wiki from './pages/Wiki'
import Involve from './pages/Involve'
import styles from './App.module.css'

const PAGES = { home: Home, magazine: Magazine, wiki: Wiki, involve: Involve }

// Visible in local dev always; in production only when VITE_LIVE=true is set
// in the Cloudflare Pages environment variables.
const isLive = import.meta.env.DEV || import.meta.env.VITE_LIVE === 'true'

export default function App() {
  const [active, setActive] = useState('home')

  if (!isLive) return <div style={{ position: 'fixed', inset: 0, background: '#fff' }} />

  return (
    <>
      <SvgDefs />
      <div className={styles.app}>
        <div className={styles.book}>
          <Spine active={active} onNav={setActive} />
          <main className={styles.pages}>
            {Object.entries(PAGES).map(([key, Page]) => (
              <div
                key={key}
                className={`${styles.page} ${active === key ? styles.pageActive : ''}`}
                aria-hidden={active !== key}
              >
                <Page onNav={setActive} />
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  )
}
