import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface CircuitBackgroundProps {
  tone?: 'light' | 'dark'
  className?: string
}

const TRACE_PATHS = [
  'M0,120 H260 V300 H520 V80 H1000',
  'M0,420 H180 V620 H460 V500 H1000',
  'M0,700 H320 V880 H700 V760 H1000',
  'M120,1000 V820 H380 V0',
  'M860,1000 V780 H600 V0',
]

const NODES = [
  { cx: 260, cy: 300 },
  { cx: 520, cy: 80 },
  { cx: 180, cy: 620 },
  { cx: 460, cy: 500 },
  { cx: 320, cy: 880 },
  { cx: 700, cy: 760 },
  { cx: 380, cy: 820 },
  { cx: 600, cy: 780 },
]

export function CircuitBackground({ tone = 'light', className = '' }: CircuitBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  // Animations only run while the block is near the viewport — with several of
  // these on one page, animating the ones scrolled far off-screen was pure waste.
  const inView = useInView(svgRef, { margin: '200px', amount: 0 })

  const lineColor = tone === 'light' ? '#e0231c' : '#ffffff'
  const nodeColor = tone === 'light' ? '#e0231c' : '#ffd400'
  const baseOpacity = tone === 'light' ? 0.14 : 0.16

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {TRACE_PATHS.map((d, i) => (
        <g key={d}>
          <path
            d={d}
            fill="none"
            stroke={lineColor}
            strokeWidth={1.5}
            strokeOpacity={baseOpacity}
            vectorEffect="non-scaling-stroke"
          />
          {/* Outer bloom — blurred but static (painted once, never re-filtered per frame) */}
          <path
            d={d}
            fill="none"
            stroke={lineColor}
            strokeWidth={5}
            strokeOpacity={0.3}
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'blur(4px)' }}
          />
          {/* Bright core — crisp, animated, no filter attached */}
          {inView && (
            <motion.path
              d={d}
              fill="none"
              stroke={lineColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeOpacity={0.95}
              strokeDasharray="60 940"
              vectorEffect="non-scaling-stroke"
              animate={{ strokeDashoffset: [0, -1000] }}
              transition={{ duration: 7 + i * 1.3, repeat: Infinity, ease: 'linear', delay: i * 0.9 }}
            />
          )}
        </g>
      ))}
      {NODES.map((n, i) => (
        <g key={`${n.cx}-${n.cy}`}>
          <circle cx={n.cx} cy={n.cy} r={7} fill={nodeColor} opacity={0.35} style={{ filter: 'blur(3px)' }} />
          {inView && (
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={4}
              fill={nodeColor}
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.7, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}
