import { useState } from 'react'
import { FORMS } from '../data/forms-config'
import Glyph from '../components/icons/Glyph'
import Modal from '../components/Modal'
import styles from './Involve.module.css'

const CARDS = [
  {
    key: 'pledge',
    className: 'pledge',
    icon: 'hand',
    title: 'Pledge',
    body: 'Make a quiet commitment of time, skill, or resource toward a future season of the work — a promise held, not a transaction.',
    cta: 'Make a Pledge →',
    modalTitle: 'Make a Pledge',
    modalDesc: 'Fill in our short form to record your pledge. We will hold it with care and be in touch when the season comes.',
    formLabel: 'Open Pledge Form',
  },
  {
    key: 'volunteer',
    className: 'volunteer',
    icon: 'hammer',
    title: 'Volunteer',
    body: 'Bring your hands, your trade, or simply your Saturday. There is a place for every kind of service here.',
    cta: 'Offer Your Skills →',
    modalTitle: 'Offer Your Skills',
    modalDesc: 'Let us know what you can bring — a trade, a weekend, or ongoing time. The site coordinator will match you to the right moment.',
    formLabel: 'Open Volunteer Form',
  },
  {
    key: 'refer',
    className: 'refer',
    icon: 'people',
    title: 'Refer',
    body: "Know a person, professional, or organisation who could help this work move faster or further? Introduce them.",
    cta: 'Make an Introduction →',
    modalTitle: 'Make an Introduction',
    modalDesc: 'A good introduction can move the work further than almost anything else. Share a few details and we will take it from there.',
    formLabel: 'Open Referral Form',
  },
]

function FormBridgeModal({ card, onClose }) {
  const url = FORMS[card.key]
  return (
    <div>
      <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.4rem' }}>
        {card.modalDesc}
      </p>
      <p style={{ fontSize: '0.72rem', color: 'var(--muted-light)', marginBottom: '1.6rem', lineHeight: 1.5 }}>
        You will be taken to a Google Form. Your response is stored securely and only seen by the Wasimi team.
      </p>
      <div style={{ display: 'flex', gap: '0.7rem' }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-submit"
          onClick={onClose}
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          {card.formLabel} ↗
        </a>
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default function Involve() {
  const [open, setOpen] = useState(null)
  const activeCard = CARDS.find(c => c.key === open)

  return (
    <div className={styles.involve}>
      <div className={styles.head}>
        <h2 className={styles.heading}>
          <Glyph id="hand" size={22} color="var(--gold-deep)" />
          Take Part
        </h2>
        <p className={styles.sub}>Five ways to walk with the work at Wasimi — choose what fits your season.</p>
      </div>

      <div className={styles.grid}>
        {CARDS.map(card => (
          <div key={card.key} className={`${styles.card} ${styles[card.className]}`}>
            <Glyph id={card.icon} size={26} color="var(--gold-bright)" />
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.body}</p>
            <button className={styles.link} onClick={() => setOpen(card.key)}>{card.cta}</button>
          </div>
        ))}

        <div className={styles.subRow}>
          {/* Subscribe */}
          <div className={`${styles.card} ${styles.subscribe}`}>
            <Glyph id="envelope" size={26} color="var(--gold-deep)" />
            <h3 className={styles.cardTitle}>Subscribe to the Journal</h3>
            <p className={styles.cardBody}>One dispatch, every Friday — the story of the house, as it is being built.</p>
            <button className={styles.subscribeBtn} onClick={() => setOpen('subscribe')}>Subscribe →</button>
          </div>

          {/* Give — deliberately understated */}
          <div className={`${styles.card} ${styles.give}`}>
            <Glyph id="coin" size={20} color="var(--gold-deep)" style={{ opacity: 0.55 }} />
            <h3 className={styles.giveTitle}>Give</h3>
            <p className={styles.giveBody}>For those who wish to give financially toward the house.</p>
            <button className={styles.giveLink} onClick={() => setOpen('give')}>Learn how →</button>
          </div>
        </div>
      </div>

      {/* Bridge modal — opens Google Form in new tab */}
      <Modal
        open={!!open && !!activeCard}
        onClose={() => setOpen(null)}
        title={activeCard?.modalTitle}
        icon={activeCard ? <Glyph id={activeCard.icon} size={20} color="var(--gold-deep)" /> : null}
      >
        {activeCard && <FormBridgeModal card={activeCard} onClose={() => setOpen(null)} />}
      </Modal>

      {/* Subscribe bridge */}
      <Modal open={open === 'subscribe'} onClose={() => setOpen(null)} title="Subscribe to the Journal"
        icon={<Glyph id="envelope" size={20} color="var(--gold-deep)" />}>
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.4rem' }}>
          One dispatch every Friday — construction updates, community voices, and quiet reflections — sent to your inbox or WhatsApp.
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--muted-light)', marginBottom: '1.6rem' }}>
          You will be taken to a Google Form to add your details.
        </p>
        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <a href={FORMS.subscribe} target="_blank" rel="noopener noreferrer" className="btn-submit"
            onClick={() => setOpen(null)} style={{ display: 'inline-block', textDecoration: 'none' }}>
            Open Subscribe Form ↗
          </a>
          <button className="btn-cancel" onClick={() => setOpen(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Give bridge — minimal */}
      <Modal open={open === 'give'} onClose={() => setOpen(null)} title="Give"
        icon={<Glyph id="coin" size={20} color="var(--gold-deep)" />}>
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.4rem' }}>
          For those who wish to give financially toward the house. Leave your details and the team will be in touch — there are no amounts, no targets, and no pressure here.
        </p>
        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <a href={FORMS.give} target="_blank" rel="noopener noreferrer" className="btn-submit"
            onClick={() => setOpen(null)} style={{ display: 'inline-block', textDecoration: 'none' }}>
            Open Form ↗
          </a>
          <button className="btn-cancel" onClick={() => setOpen(null)}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}
