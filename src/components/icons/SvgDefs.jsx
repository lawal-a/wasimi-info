export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <symbol id="icon-temple" viewBox="0 0 200 200">
          <path d="M100 10 L180 60 L20 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="15" y="60" width="170" height="8" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="30" y="75" width="10" height="95" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="58" y="75" width="10" height="95" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="86" y="75" width="10" height="95" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="114" y="75" width="10" height="95" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="142" y="75" width="10" height="95" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="160" y="75" width="10" height="95" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="10" y="170" width="180" height="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="2" y="180" width="196" height="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        </symbol>

        <symbol id="icon-scroll" viewBox="0 0 100 60">
          <path d="M8 10 Q2 10 2 18 Q2 26 10 26 L10 34 Q2 34 2 42 Q2 50 8 50" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M92 10 Q98 10 98 18 Q98 26 90 26 L90 34 Q98 34 98 42 Q98 50 92 50" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="88" y2="18" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="10" y1="26" x2="90" y2="26" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="10" y1="34" x2="90" y2="34" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="12" y1="42" x2="88" y2="42" stroke="currentColor" strokeWidth="1.4"/>
        </symbol>

        <symbol id="icon-lamp" viewBox="0 0 40 40">
          <path d="M20 5 C24 12 26 16 20 22 C14 16 16 12 20 5Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <ellipse cx="20" cy="27" rx="12" ry="6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M8 27 Q20 33 32 27" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <rect x="17" y="33" width="6" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        </symbol>

        <symbol id="icon-column" viewBox="0 0 40 60">
          <rect x="8" y="4" width="24" height="5" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <rect x="14" y="9" width="12" height="40" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <rect x="6" y="49" width="28" height="6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-arch" viewBox="0 0 40 40">
          <path d="M6 36 V18 A14 14 0 0 1 34 18 V36" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="2" y1="36" x2="38" y2="36" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-book" viewBox="0 0 40 32">
          <path d="M20 6 C16 3 8 2 3 4 V26 C8 24 16 25 20 28 C24 25 32 24 37 26 V4 C32 2 24 3 20 6Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="20" y1="6" x2="20" y2="28" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-quill" viewBox="0 0 40 40">
          <path d="M34 4 C20 8 8 20 5 34 C16 30 30 20 34 4Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="5" y1="34" x2="2" y2="38" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-hand" viewBox="0 0 40 40">
          <path d="M12 20 V8 a3 3 0 0 1 6 0 v10 M18 18 V6 a3 3 0 0 1 6 0 v12 M24 18 V9 a3 3 0 0 1 6 0 v13 M30 20 v-6 a3 3 0 0 1 6 0 v12 c0 7 -6 12 -13 12 h-4 c-5 0 -8 -2 -11 -6 l-6 -8 a3 3 0 0 1 5 -3 l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </symbol>

        <symbol id="icon-people" viewBox="0 0 40 40">
          <circle cx="14" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="27" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M4 34 C4 25 9 20 14 20 C19 20 24 25 24 34" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M22 34 C22 27 25 22 30 22 C35 22 37 27 37 34" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-envelope" viewBox="0 0 40 30">
          <rect x="3" y="4" width="34" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M4 6 L20 18 L36 6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-coin" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M20 12 v16 M16 15 h6 a3 3 0 0 1 0 6 h-4 a3 3 0 0 0 0 6 h6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </symbol>

        <symbol id="icon-hammer" viewBox="0 0 40 40">
          <rect x="21" y="4" width="9" height="16" rx="1.5" transform="rotate(45 25 12)" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="19" y1="18" x2="6" y2="34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </symbol>

        <symbol id="icon-compass" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M26 12 L20 20 L14 28 L20 20 L26 12Z" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        </symbol>

        <symbol id="icon-shield" viewBox="0 0 40 40">
          <path d="M20 4 L34 9 V19 C34 28 28 34 20 37 C12 34 6 28 6 19 V9 Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        </symbol>

        <symbol id="icon-family" viewBox="0 0 40 40">
          <circle cx="14" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="26" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="20" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 34 C4 26 9 22 14 22 C19 22 22 26 22 30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M36 34 C36 26 31 22 26 22 C21 22 18 26 18 30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 36 C12 31 15 28 20 28 C25 28 28 31 28 36" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </symbol>

        <symbol id="icon-globe" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <ellipse cx="20" cy="20" rx="7" ry="16" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.4"/>
        </symbol>

        <symbol id="icon-cross" viewBox="0 0 40 40">
          <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="14" x2="32" y2="14" stroke="currentColor" strokeWidth="2"/>
        </symbol>

        <symbol id="icon-search" viewBox="0 0 40 40">
          <circle cx="17" cy="17" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="26" y1="26" x2="36" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </symbol>

        <symbol id="icon-video-play" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <polygon points="16,13 30,20 16,27" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </symbol>

        <symbol id="icon-audio-wave" viewBox="0 0 38 28">
          <line x1="1"  y1="14" x2="1"  y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="7"  y1="9"  x2="7"  y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="13" y1="4"  x2="13" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="19" y1="1"  x2="19" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="4"  x2="25" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="31" y1="9"  x2="31" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="37" y1="14" x2="37" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </symbol>

        <symbol id="icon-laurel" viewBox="0 0 80 40">
          <path d="M10 20 C8 14 12 8 18 10 C14 16 16 22 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M10 20 C6 20 4 26 8 28 C10 22 16 22 18 26" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M70 20 C72 14 68 8 62 10 C66 16 64 22 58 22" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M70 20 C74 20 76 26 72 28 C70 22 64 22 62 26" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="20" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="40" cy="28" r="2" fill="currentColor"/>
        </symbol>
      </defs>
    </svg>
  )
}
