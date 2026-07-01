import { useState } from 'react'
import { articles, settings } from '../lib/content'
import Glyph from '../components/icons/Glyph'
import styles from './Home.module.css'

export default function Home({ onNav }) {
  const [query, setQuery] = useState('')
  const latest = articles[0]

  const handleSearch = (e) => {
    e.preventDefault()
    onNav('wiki')
  }

  return (
    <div className={styles.home}>
      <svg className={styles.watermark} viewBox="0 0 200 200" aria-hidden="true">
        <use href="#icon-temple" color="var(--gold-deep)" />
      </svg>
      <svg className={styles.scrollTR} viewBox="0 0 100 60" color="var(--gold-deep)" aria-hidden="true">
        <use href="#icon-scroll" />
      </svg>

      <div className={styles.left}>
        {/* ── Masthead ── */}
        <div className={styles.mastheadWrap}>
          <div className={styles.masthead}>
            <span className={styles.mastheadDash} />
            <h1 className={styles.mastheadText}>WASIMI</h1>
            <span className={styles.mastheadDash} />
          </div>
          <p className={styles.mastheadSub}>{settings.siteTagline}</p>
        </div>

        <div className={styles.divider} />

        {/* ── Dynamic latest article ── */}
        {latest && (
          <div className={styles.latestBlock}>
            <div className={styles.kicker}>
              <span className={styles.tag}>{latest.tag}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.date}>{latest.date}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.issue}>Issue No.&nbsp;{settings.journalIssue}</span>
            </div>
            <h2 className={styles.headline}>{latest.title}</h2>
            {latest.excerpt && <p className={styles.excerpt}>{latest.excerpt}</p>}
            <button className={styles.readMore} onClick={() => onNav('magazine')}>
              Read in the Journal →
            </button>
          </div>
        )}

        {/* ── Search bar ── */}
        <form className={styles.searchBar} onSubmit={handleSearch}>
          <Glyph id="search" size={16} color="var(--gold-deep)" style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the Wiki — 'Is there a clinic on site?'"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
        </form>
      </div>

      <div className={styles.right}>
        <div className={styles.medallion}>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <svg className={styles.laurelTop} viewBox="0 0 80 40" color="var(--gold-deep)" aria-hidden="true">
            <use href="#icon-laurel" />
          </svg>
          <div className={styles.medallionIcon}>
            <svg width="130" height="130" style={{ color: 'var(--gold-deep)' }}>
              <use href="#icon-arch" />
            </svg>
          </div>
          <svg className={`${styles.mdDeco} ${styles.md1}`} viewBox="0 0 40 40" color="var(--gold-deep)"><use href="#icon-lamp" /></svg>
          <svg className={`${styles.mdDeco} ${styles.md2}`} viewBox="0 0 40 40" color="var(--gold-deep)"><use href="#icon-cross" /></svg>
          <svg className={`${styles.mdDeco} ${styles.md3}`} viewBox="0 0 40 60" color="var(--gold-deep)"><use href="#icon-column" /></svg>
          <div className={styles.medallionCaption}>The House of Wasimi</div>
        </div>
      </div>
    </div>
  )
}
