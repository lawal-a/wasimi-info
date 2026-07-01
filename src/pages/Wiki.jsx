import { wikiTopics } from '../lib/content'
import Glyph from '../components/icons/Glyph'
import styles from './Wiki.module.css'

export default function Wiki() {
  return (
    <div className={styles.wiki}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <h2 className={styles.heading}>
            <Glyph id="book" size={22} color="var(--gold-deep)" />
            The Wiki
          </h2>
          <p className={styles.sub}>Every practical question, answered — directions, safety, the building's story, and how to take part.</p>
        </div>
        <div className={styles.searchBox}>
          <Glyph id="search" size={16} color="var(--gold-deep)" />
          <input type="text" placeholder="Ask anything — 'Is there a clinic on site?'" className={styles.searchInput} />
          <button className={styles.searchBtn}>Search</button>
        </div>
      </div>

      <div className={styles.grid}>
        {wikiTopics.map(({ id, icon, title, count, desc }) => (
          <div key={id} className={styles.card}>
            <Glyph id={icon} size={24} color="var(--gold-deep)" />
            <h4 className={styles.cardTitle}>{title}</h4>
            <span className={styles.count}>{count} articles</span>
            <p className={styles.desc}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
