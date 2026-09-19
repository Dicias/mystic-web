import { motion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
}

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92 },
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
