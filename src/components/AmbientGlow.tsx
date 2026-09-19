import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AmbientGlowProps {
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Brand-color glow blobs that drift at different speeds as the section scrolls
 * through the viewport, giving every page the same layered-depth feel as the
 * loading screen without the cost of a canvas particle system on every route.
 */
export function AmbientGlow({ tone = 'light', className = '' }: AmbientGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const yRed = useTransform(scrollYProgress, [0, 1], [-50, 70])
  const yYellow = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rotateRed = useTransform(scrollYProgress, [0, 1], [0, 20])
  const scaleYellow = useTransform(scrollYProgress, [0, 1], [0.9, 1.15])

  const redClass = tone === 'dark' ? 'bg-brand-red/25' : 'bg-brand-red/10'
  const yellowClass = tone === 'dark' ? 'bg-brand-yellow/15' : 'bg-brand-yellow/10'

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ y: yRed, rotate: rotateRed }}
        className={`absolute -left-24 -top-10 h-72 w-72 rounded-full ${redClass} blur-3xl`}
      />
      <motion.div
        style={{ y: yYellow, scale: scaleYellow }}
        className={`absolute -bottom-16 -right-12 h-80 w-80 rounded-full ${yellowClass} blur-3xl`}
      />
    </div>
  )
}
