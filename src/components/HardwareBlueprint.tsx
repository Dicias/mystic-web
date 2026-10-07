import type { ReactNode } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CpuIcon, FanIcon, GpuIcon, MotherboardIcon, RamIcon } from './PcPartIcons'

interface HardwareBlueprintProps {
  /** 0 -> 1 assembly progress — drives every part's fly-in. */
  progress: MotionValue<number>
  className?: string
}

interface Vector {
  x: number
  y: number
  rotate: number
}

interface PartSpec {
  id: string
  label: string
  range: [number, number]
  from: Vector
  to: Vector
  color: string
  size: string
  icon: ReactNode
}

// Exploded view: the motherboard sits in the middle and every other part is
// pulled out to its own corner, far enough apart that icons and labels never
// overlap. Parts fly in from beyond the frame and settle on those positions.
const PARTS: PartSpec[] = [
  {
    id: 'mobo',
    label: 'Motherboard',
    range: [0, 0.45],
    from: { x: 0, y: 40, rotate: -12 },
    to: { x: 0, y: -4, rotate: 0 },
    color: 'text-white/75',
    size: 'h-36 w-36 sm:h-40 sm:w-40',
    icon: <MotherboardIcon className="h-full w-full" />,
  },
  {
    id: 'cpu',
    label: 'CPU',
    range: [0.1, 0.55],
    from: { x: -240, y: -160, rotate: 24 },
    to: { x: -150, y: -96, rotate: 0 },
    color: 'text-brand-red',
    size: 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]',
    icon: <CpuIcon className="h-full w-full" />,
  },
  {
    id: 'ram',
    label: 'RAM',
    range: [0.18, 0.62],
    from: { x: -240, y: 170, rotate: -30 },
    to: { x: -158, y: 78, rotate: 0 },
    color: 'text-brand-yellow',
    size: 'h-20 w-9 sm:h-24 sm:w-10',
    icon: <RamIcon className="h-full w-full" />,
  },
  {
    id: 'fan',
    label: 'Cooling',
    range: [0.26, 0.7],
    from: { x: 240, y: -170, rotate: -40 },
    to: { x: 150, y: -96, rotate: 0 },
    color: 'text-brand-red/85',
    size: 'h-14 w-14 sm:h-16 sm:w-16',
    icon: <FanIcon className="h-full w-full" />,
  },
  {
    id: 'gpu',
    label: 'GPU',
    range: [0.34, 0.78],
    from: { x: 240, y: 170, rotate: 22 },
    to: { x: 138, y: 86, rotate: 0 },
    color: 'text-white/75',
    size: 'h-16 w-28 sm:h-[4.5rem] sm:w-32',
    icon: <GpuIcon className="h-full w-full" />,
  },
]

/** Half-size of the motherboard, so leader lines stop at its edge instead of crossing it. */
const MOBO_RADIUS = 84

function BlueprintPart({
  progress,
  part,
}: {
  progress: MotionValue<number>
  part: PartSpec
}) {
  const t = useTransform(progress, part.range, [0, 1])
  const x = useTransform(t, [0, 1], [part.from.x, part.to.x])
  const y = useTransform(t, [0, 1], [part.from.y, part.to.y])
  const rotate = useTransform(t, [0, 1], [part.from.rotate, part.to.rotate])
  const opacity = useTransform(t, [0, 1], [0, 1])
  const scale = useTransform(t, [0, 1], [0.7, 1])

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 ${part.color}`}
    >
      <div
        className={part.size}
        style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
      >
        {part.icon}
      </div>
      <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        {part.label}
      </span>
    </motion.div>
  )
}

/** Dashed connector from a part back to the board edge; draws in as the part lands. */
function LeaderLine({ progress, part }: { progress: MotionValue<number>; part: PartSpec }) {
  const pathLength = useTransform(progress, [part.range[1] - 0.05, part.range[1] + 0.12], [0, 1])
  const { x, y } = part.to
  const dist = Math.hypot(x, y)
  const ex = (x / dist) * MOBO_RADIUS
  const ey = (y / dist) * MOBO_RADIUS
  // Start a little short of the part's centre so the line meets its outline, not its middle.
  const sx = x * 0.78
  const sy = y * 0.78

  return (
    <motion.path
      d={`M${sx} ${sy} L${ex} ${ey}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeDasharray="3 4"
      style={{ pathLength }}
    />
  )
}

export function HardwareBlueprint({ progress, className = '' }: HardwareBlueprintProps) {
  return (
    <div className={`w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-xs text-white/40">mysac_hardware.blueprint</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">exploded</span>
      </div>

      <div
        className="relative h-80 overflow-hidden sm:h-[26rem]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* Everything is laid out around the panel centre; the wrapper scales the
            whole drawing down on narrow screens so the corners stay in frame. */}
        <div className="absolute left-1/2 top-1/2 scale-[0.72] sm:scale-90 lg:scale-100">
          <svg className="absolute left-0 top-0 overflow-visible text-white/25" width="0" height="0" aria-hidden="true">
            {PARTS.slice(1).map((part) => (
              <LeaderLine key={part.id} progress={progress} part={part} />
            ))}
          </svg>
          {PARTS.map((part) => (
            <BlueprintPart key={part.id} progress={progress} part={part} />
          ))}
        </div>
      </div>
    </div>
  )
}
