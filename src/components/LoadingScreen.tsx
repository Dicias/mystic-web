import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate as animateValue,
  type MotionValue,
} from 'framer-motion'
import { FluidParticlesBackground } from './ui/fluid-particles-background'
import { CircuitBackground } from './CircuitBackground'
import CloudLoader from './ui/quantum-cloud-loader'
import logo from '../assets/logo.jpeg'
import { BUSINESS } from '../data/business'

/** Kept in sync with the fade-out timer in App.tsx so the progress bar always finishes on cue. */
export const LOADING_DURATION_MS = 2800

interface ParallaxLayerProps {
  depth: number
  springX: MotionValue<number>
  springY: MotionValue<number>
  className?: string
  children: ReactNode
}

function ParallaxLayer({ depth, springX, springY, className, children }: ParallaxLayerProps) {
  const x = useTransform(springX, [-1, 1], [-depth, depth])
  const y = useTransform(springY, [-1, 1], [-depth, depth])

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

const TAGLINE = 'Preparando tu experiencia'

const CORNER_POSITIONS = [
  'top-6 left-6 border-l-2 border-t-2',
  'top-6 right-6 border-r-2 border-t-2',
  'bottom-6 left-6 border-b-2 border-l-2',
  'bottom-6 right-6 border-b-2 border-r-2',
] as const

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.4 })

  const [percent, setPercent] = useState(0)
  const progressWidth = useMotionValue('0%')

  useEffect(() => {
    const controls = animateValue(0, 100, {
      duration: LOADING_DURATION_MS / 1000,
      ease: 'easeInOut',
      onUpdate: (v) => {
        setPercent(Math.round(v))
        progressWidth.set(`${v}%`)
      },
    })
    return () => controls.stop()
  }, [progressWidth])

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="fixed inset-0 z-[100] overflow-hidden bg-brand-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <FluidParticlesBackground
        dark
        particleCount={900}
        className="absolute inset-0 h-full w-full"
      />

      {/* Depth layer 1 — animated circuit traces, barely reacts to the pointer */}
      <ParallaxLayer depth={8} springX={springX} springY={springY} className="absolute inset-0">
        <CircuitBackground tone="dark" className="opacity-30" />
      </ParallaxLayer>

      {/* Depth layer 2 — ambient brand-color glows, drifting on their own + pointer parallax */}
      <ParallaxLayer depth={26} springX={springX} springY={springY} className="absolute inset-0">
        <motion.div
          className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-red/30 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-brand-yellow/20 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, -30, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      {/* Depth layer 3 — foreground content, moves the most for a punchy parallax feel */}
      <ParallaxLayer
        depth={40}
        springX={springX}
        springY={springY}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={logo}
            alt={BUSINESS.name}
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="h-16 w-auto object-contain drop-shadow-[0_0_25px_rgba(224,35,28,0.35)] sm:h-20"
          />
          <CloudLoader />
        </motion.div>

        <motion.p
          className="flex text-sm font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-base"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.035, delayChildren: 0.3 } },
          }}
        >
          {TAGLINE.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.p>

        <div className="flex w-full max-w-xs flex-col items-center gap-2">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red"
              style={{ width: progressWidth }}
            />
          </div>
          <span className="font-mono text-xs tabular-nums text-white/50">{percent}%</span>
        </div>
      </ParallaxLayer>

      {/* Scanning corner brackets — subtle boot-sequence accent */}
      {CORNER_POSITIONS.map((pos, i) => (
        <motion.div
          key={pos}
          className={`pointer-events-none absolute z-10 h-8 w-8 ${pos} border-brand-yellow/50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
        />
      ))}
    </motion.div>
  )
}
