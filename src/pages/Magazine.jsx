import { useState } from 'react'
import { articles } from '../lib/content'
import Glyph from '../components/icons/Glyph'
import styles from './Magazine.module.css'

const FILTERS = ['All', 'Construction', 'Community', 'Reflection', 'Testimony']

export default function Magazine() {
  const [activeFilter, setActiveFilter] = useState('All')
  const visible = articles.filter(a => activeFilter === 'All' || a.tag === activeFilter)

  return (
    <div className={styles.mag}>
      <div className={styles.head}>
        <h2 className={styles.heading}>
          <Glyph id="scroll" size={22} color="var(--gold-deep)" />
          The Journal
        </h2>
        <div className={styles.pills}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.pill} ${activeFilter === f ? styles.pillActive : ''}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {visible.map((article, idx) => (
          <div
            key={article.id}
            className={`${styles.card} ${idx === 0 && activeFilter === 'All' ? styles.feat : ''} ${article.wide ? styles.wide : ''}`}
          >
            <span className={styles.tag}>{article.tag}</span>
            <span className={styles.date}>{article.date}</span>
            <h3 className={styles.title}>{article.title}</h3>
            {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
            <span className={styles.more}>Read →</span>
          </div>
        ))}
      </div>
    </div>
  )
}
