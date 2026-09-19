interface SpotlightProps {
  className?: string
  size?: number
}

/**
 * A solid overlay with a radial-gradient mask "hole" that follows the cursor,
 * revealing whatever sits underneath it (e.g. a circuit texture) only near the pointer.
 * Reads --spot-x/--spot-y custom properties set by an ancestor's pointer handler —
 * CSS custom properties inherit, so no local pointer tracking is needed here.
 */
export function Spotlight({ className = '', size = 240 }: SpotlightProps) {
  const gradient = `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 30%), transparent 0%, transparent 35%, black 75%)`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-brand-black ${className}`}
      style={{
        maskImage: gradient,
        WebkitMaskImage: gradient,
      }}
    />
  )
}
