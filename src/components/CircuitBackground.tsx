import { motion } from 'framer-motion'

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
  const lineColor = tone === 'light' ? '#e0231c' : '#ffffff'
  const nodeColor = tone === 'light' ? '#e0231c' : '#ffd400'
  const baseOpacity = tone === 'light' ? 0.1 : 0.14

  return (
    <svg
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
          <motion.path
            d={d}
            fill="none"
            stroke={lineColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeOpacity={0.7}
            strokeDasharray="50 950"
            vectorEffect="non-scaling-stroke"
            animate={{ strokeDashoffset: [0, -1000] }}
            transition={{ duration: 7 + i * 1.3, repeat: Infinity, ease: 'linear', delay: i * 0.9 }}
          />
        </g>
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={5}
          fill={nodeColor}
          initial={{ opacity: 0.25, scale: 1 }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.7, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
        />
      ))}
    </svg>
  )
}
