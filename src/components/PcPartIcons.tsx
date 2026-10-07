interface IconProps {
  className?: string
}

/** Line-art blueprint icons — deliberately schematic, not fake-photoreal 3D. */

export function MotherboardIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="4" width="92" height="92" rx="4" />
      <rect x="14" y="14" width="26" height="26" rx="2" />
      <line x1="48" y1="12" x2="48" y2="44" />
      <line x1="56" y1="12" x2="56" y2="44" />
      <line x1="64" y1="12" x2="64" y2="44" />
      <line x1="72" y1="12" x2="72" y2="44" />
      <rect x="12" y="68" width="64" height="9" rx="1.5" />
      <circle cx="10" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="90" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="10" cy="90" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="90" cy="90" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CpuIcon({ className = '' }: IconProps) {
  const ticks = [16, 26, 36, 46]
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="10" y="10" width="44" height="44" rx="3" />
      <path d="M10,10 L18,10 L10,18 Z" fill="currentColor" stroke="none" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={t} y1="2" x2={t} y2="10" />
          <line x1={t} y1="54" x2={t} y2="62" />
          <line x1="2" y1={t} x2="10" y2={t} />
          <line x1="54" y1={t} x2="62" y2={t} />
        </g>
      ))}
    </svg>
  )
}

export function RamIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 36 96" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="30" height="84" rx="2" />
      <rect x="12" y="87" width="4" height="6" fill="currentColor" stroke="none" />
      <line x1="9" y1="16" x2="27" y2="16" />
      <line x1="9" y1="26" x2="27" y2="26" />
      <line x1="9" y1="36" x2="27" y2="36" />
      <line x1="9" y1="46" x2="27" y2="46" />
    </svg>
  )
}

export function GpuIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="4" width="112" height="46" rx="4" />
      <rect x="0" y="50" width="20" height="8" rx="1" />
      <circle cx="36" cy="27" r="15" />
      <circle cx="36" cy="27" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="80" cy="27" r="15" />
      <circle cx="80" cy="27" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FanIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          d="M32,32 Q40,20 32,8 Q24,20 32,32"
          fill="currentColor"
          fillOpacity={0.5}
          stroke="none"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
    </svg>
  )
}
