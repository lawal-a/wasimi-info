import { useState, useRef } from 'react'
import { wikiTopics } from '../lib/content'
import { MEDIA } from '../data/media-config'
import Glyph from '../components/icons/Glyph'
import styles from './Wiki.module.css'

const API_URL = import.meta.env.VITE_API_URL ?? ''

function AudioTrack({ track }) {
  const audioRef              = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime]       = useState('0:00')

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else         { audioRef.current.play();  setPlaying(true)  }
  }

  const onTimeUpdate = () => {
    const s = Math.floor(audioRef.current.currentTime)
    setTime(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
  }

  return (
    <div className={styles.audioTrack}>
      <div className={styles.audioInfo}>
        <span className={styles.audioTitle}>{track.title}</span>
        <span className={styles.audioSpeaker}>{track.speaker}</span>
      </div>
      {track.url ? (
        <>
          <audio ref={audioRef} src={track.url}
            onTimeUpdate={onTimeUpdate}
            onEnded={() => { setPlaying(false); setTime('0:00') }}
          />
          <button className={styles.playBtn} onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
          <span className={styles.audioTime}>{time}</span>
        </>
      ) : (
        <span className={styles.audioSoon}>Soon</span>
      )}
    </div>
  )
}

export default function Wiki() {
  const [query, setQuery]     = useState('')
  const [answer, setAnswer]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const inputRef              = useRef(null)

  const ask = async (q) => {
    const trimmed = q.trim()
    if (!trimmed) return
    setLoading(true)
    setAnswer(null)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query: trimmed }),
      })
      if (!res.ok) throw new Error(`Worker returned ${res.status}`)
      const data = await res.json()
      setAnswer(data)
    } catch {
      setError('The AI guide is not available yet — the Worker is still being set up. Browse the topics below for now.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    ask(query)
  }

  const clear = () => {
    setQuery('')
    setAnswer(null)
    setError(null)
    inputRef.current?.focus()
  }

  return (
    <div className={styles.wiki}>

      {/* ── Top bar ── */}
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <h2 className={styles.heading}>
            <Glyph id="book" size={22} color="var(--gold-deep)" />
            The Wiki
          </h2>
          <p className={styles.sub}>Ask a question below or browse topics — the guide knows the site.</p>
        </div>
      </div>

      {/* ── AI search bar ── */}
      <form className={styles.searchRow} onSubmit={handleSubmit}>
        <div className={`${styles.searchBox} ${loading ? styles.searching : ''}`}>
          <Glyph id="search" size={16} color="var(--gold-deep)" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask anything — 'How do I get to the site?' or 'Is there parking?'"
            className={styles.searchInput}
          />
          {query && (
            <button type="button" className={styles.clearBtn} onClick={clear} aria-label="Clear">×</button>
          )}
        </div>
        <button type="submit" className={styles.askBtn} disabled={loading || !query.trim()}>
          {loading ? <span className={styles.spinner} /> : 'Ask'}
        </button>
      </form>

      {/* ── AI answer panel ── */}
      {(loading || answer || error) && (
        <div className={styles.answerPanel}>
          {loading && (
            <div className={styles.answerLoading}>
              <span className={styles.pulseRow}>
                <span /><span /><span />
              </span>
              <p>Consulting the guide…</p>
            </div>
          )}
          {answer && (
            <>
              <div className={styles.answerMeta}>
                <svg width="14" height="14" style={{ color: 'var(--gold-deep)', flexShrink: 0 }}><use href="#icon-lamp" /></svg>
                <span>AI Guide</span>
              </div>
              <p className={styles.answerText}>{answer.answer}</p>
              {answer.sources?.length > 0 && (
                <div className={styles.sources}>
                  <span className={styles.sourcesLabel}>From:</span>
                  {answer.sources.map((s, i) => (
                    <span key={i} className={styles.sourceChip}>
                      {s.topic} — {s.title}
                    </span>
                  ))}
                </div>
              )}
              <button className={styles.clearAnswer} onClick={clear}>Clear ×</button>
            </>
          )}
          {error && (
            <div className={styles.answerError}>
              <p>{error}</p>
              <button className={styles.clearAnswer} onClick={clear}>Dismiss</button>
            </div>
          )}
        </div>
      )}

      {/* ── Media strip ── */}
      <div className={styles.mediaStrip}>

        {/* Video segment */}
        <div className={styles.mediaCard}>
          <div className={styles.mediaCardHead}>
            <Glyph id="video-play" size={13} color="var(--gold-deep)" />
            <span>Featured Video</span>
          </div>
          {MEDIA.video.youtubeId ? (
            <iframe
              className={styles.videoEmbed}
              src={`https://www.youtube.com/embed/${MEDIA.video.youtubeId}`}
              title={MEDIA.video.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className={styles.videoPlaceholder}>
              <Glyph id="arch" size={36} color="var(--gold-deep)" style={{ opacity: 0.3, flexShrink: 0 }} />
              <div className={styles.videoPlaceholderText}>
                <p className={styles.videoPlaceholderTitle}>{MEDIA.video.label}</p>
                <p className={styles.videoPlaceholderDesc}>{MEDIA.video.description}</p>
                <span className={styles.videoSoonBadge}>Coming soon</span>
              </div>
            </div>
          )}
        </div>

        {/* Audio segment */}
        <div className={styles.mediaCard}>
          <div className={styles.mediaCardHead}>
            <Glyph id="audio-wave" size={13} color="var(--gold-deep)" />
            <span>Audio Messages</span>
          </div>
          <div className={styles.audioList}>
            {MEDIA.audio.map(track => (
              <AudioTrack key={track.id} track={track} />
            ))}
          </div>
        </div>

      </div>

      {/* ── Topic grid — always visible ── */}
      <div className={`${styles.grid} ${(loading || answer || error) ? styles.gridMuted : ''}`}>
        {wikiTopics.map(({ id, icon, title, count, desc }) => (
          <div key={id} className={styles.card}
            onClick={() => { setQuery(`Tell me about ${title}`); ask(`Tell me about ${title}`) }}
          >
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
