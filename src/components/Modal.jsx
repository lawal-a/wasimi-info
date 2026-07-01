import { useEffect } from 'react'
import styles from './Modal.module.css'

export default function Modal({ open, onClose, title, icon, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
        {(title || icon) && (
          <div className={styles.header}>
            {icon && <span className={styles.headerIcon}>{icon}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
