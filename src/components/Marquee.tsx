import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  className?: string
  durationSeconds?: number
}

export function Marquee({ items, className = '', durationSeconds = 24 }: MarqueeProps) {
  const loop = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="flex w-max items-center gap-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: durationSeconds, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3">
            <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-white/80">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
