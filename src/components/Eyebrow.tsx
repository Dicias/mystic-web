import { cn } from '@/lib/utils'

interface EyebrowProps {
  /** Section number, e.g. "01". Omit for a plain label. */
  index?: string
  children: React.ReactNode
  className?: string
}

/** Mono section label: "01 — Servicios". Shared across every section header. */
export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-400',
        className,
      )}
    >
      {index && <span className="text-brand-red">{index}</span>}
      {index && <span className="h-px w-8 bg-white/20" />}
      {children}
    </p>
  )
}

/** Status dot + label; green and pulsing while the shop is open. */
export function OpenBadge({ open, className }: { open: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300 backdrop-blur',
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          open ? 'animate-pulse-dot bg-green-500' : 'bg-neutral-500',
        )}
      />
      {open ? 'Abierto ahora' : 'Cerrado · L–V 9 a 18 h'}
    </span>
  )
}
