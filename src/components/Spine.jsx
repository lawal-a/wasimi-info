import egfmLight from '../assets/egfm-light.png'
import styles from './Spine.module.css'

const NAV = [
  { page: 'home',     num: '01', label: 'Home' },
  { page: 'magazine', num: '02', label: 'Journal' },
  { page: 'wiki',     num: '03', label: 'Wiki' },
  { page: 'involve',  num: '04', label: 'Involve' },
]

export default function Spine({ active, onNav }) {
  return (
    <nav className={styles.spine}>
      <img src={egfmLight} alt="EGFM" className={styles.logo} />

      <div className={styles.nav}>
        {NAV.map(({ page, num, label }) => (
          <button
            key={page}
            className={`${styles.item} ${active === page ? styles.active : ''}`}
            onClick={() => onNav(page)}
            aria-current={active === page ? 'page' : undefined}
          >
            <span className={styles.num}>{num}</span>
            <span className={styles.label}>{label}</span>
          </button>
        ))}
      </div>

      <p className={styles.foot}>EGFM</p>
    </nav>
  )
}
