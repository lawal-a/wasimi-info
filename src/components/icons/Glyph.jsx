export default function Glyph({ id, size = 22, color, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={{ color, flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <use href={`#icon-${id}`} />
    </svg>
  )
}
