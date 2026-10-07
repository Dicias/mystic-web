import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  className?: string
  durationSeconds?: number
}

/** Endless ticker. Alternates sans and serif-italic items so the strip reads as type, not a list. */
export function Marquee({ items, className = '', durationSeconds = 40 }: MarqueeProps) {
  const loop = [...items, ...items]

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: durationSeconds, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span
              className={`whitespace-nowrap text-3xl tracking-[-0.03em] sm:text-5xl ${
                i % 2
                  ? 'font-serif italic text-neutral-500'
                  : 'font-medium text-white'
              }`}
            >
              {item}
            </span>
            <span className="h-2 w-2 shrink-0 rotate-45 bg-brand-red" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
