import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CircuitBackground } from './CircuitBackground'

function FanIcon({ r = 20 }: { r?: number }) {
  return (
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
    >
      <circle r={r} fill="none" stroke="#0d0d0d" strokeWidth={2.5} />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          d={`M0,0 Q${r * 0.6},${-r * 0.35} 0,${-r * 0.85} Q${-r * 0.6},${-r * 0.35} 0,0`}
          fill="#e0231c"
          opacity={0.85}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r={r * 0.22} fill="#0d0d0d" />
    </motion.g>
  )
}

export function PcAssembly() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const caseDash = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const caseOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

  const boardX = useTransform(scrollYProgress, [0.08, 0.2], [-260, 0])
  const boardOpacity = useTransform(scrollYProgress, [0.08, 0.14], [0, 1])

  const cpuY = useTransform(scrollYProgress, [0.18, 0.3], [-160, 0])
  const cpuOpacity = useTransform(scrollYProgress, [0.18, 0.24], [0, 1])

  const ram1Y = useTransform(scrollYProgress, [0.26, 0.36], [-160, 0])
  const ram1Opacity = useTransform(scrollYProgress, [0.26, 0.31], [0, 1])
  const ram2Y = useTransform(scrollYProgress, [0.3, 0.4], [-160, 0])
  const ram2Opacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1])

  const gpuX = useTransform(scrollYProgress, [0.38, 0.5], [260, 0])
  const gpuOpacity = useTransform(scrollYProgress, [0.38, 0.44], [0, 1])

  const cableDash = useTransform(scrollYProgress, [0.48, 0.58], [1, 0])
  const cableOpacity = useTransform(scrollYProgress, [0.48, 0.5], [0, 1])

  const fan1Scale = useTransform(scrollYProgress, [0.56, 0.65], [0.2, 1])
  const fan1Opacity = useTransform(scrollYProgress, [0.56, 0.62], [0, 1])
  const fan2Scale = useTransform(scrollYProgress, [0.6, 0.69], [0.2, 1])
  const fan2Opacity = useTransform(scrollYProgress, [0.6, 0.66], [0, 1])

  const panelX = useTransform(scrollYProgress, [0.68, 0.85], [260, 0])
  const panelOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 0.18])

  const ledOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1])

  const captionOpacity = useTransform(scrollYProgress, [0.86, 1], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.86, 1], [24, 0])

  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.9, 1], [1, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-white">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <CircuitBackground tone="light" className="opacity-70" />

        <motion.p
          style={{ opacity: introOpacity }}
          className="relative z-10 mb-2 text-sm font-semibold uppercase tracking-widest text-brand-red"
        >
          Cómo trabajamos
        </motion.p>
        <motion.h2
          style={{ opacity: introOpacity }}
          className="relative z-10 mb-6 max-w-lg text-center text-3xl font-extrabold text-brand-black sm:text-4xl"
        >
          Así armamos tu equipo, pieza por pieza
        </motion.h2>

        <svg
          viewBox="0 0 400 500"
          className="relative z-10 h-[52vh] w-auto sm:h-[58vh]"
          aria-hidden="true"
        >
          {/* Case outline */}
          <motion.rect
            x={90}
            y={30}
            width={220}
            height={440}
            rx={18}
            fill="none"
            stroke="#0d0d0d"
            strokeWidth={5}
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: caseDash, opacity: caseOpacity }}
          />

          {/* Motherboard */}
          <motion.g style={{ x: boardX, opacity: boardOpacity }}>
            <rect x={115} y={55} width={170} height={260} rx={6} fill="#1a1a1a" />
            <rect x={130} y={200} width={140} height={6} rx={3} fill="#e0231c" opacity={0.7} />
            <rect x={130} y={215} width={100} height={6} rx={3} fill="#e0231c" opacity={0.45} />
          </motion.g>

          {/* CPU cooler */}
          <motion.g style={{ y: cpuY, opacity: cpuOpacity }}>
            <g transform="translate(175,115)">
              <FanIcon r={30} />
            </g>
          </motion.g>

          {/* RAM sticks */}
          <motion.rect
            x={240}
            y={65}
            width={11}
            height={85}
            rx={2}
            fill="#e0231c"
            style={{ y: ram1Y, opacity: ram1Opacity }}
          />
          <motion.rect
            x={257}
            y={65}
            width={11}
            height={85}
            rx={2}
            fill="#ffd400"
            style={{ y: ram2Y, opacity: ram2Opacity }}
          />

          {/* GPU */}
          <motion.g style={{ x: gpuX, opacity: gpuOpacity }}>
            <rect x={125} y={250} width={170} height={45} rx={4} fill="#111111" />
            <rect x={135} y={262} width={150} height={6} rx={3} fill="#e0231c" />
            <circle cx={278} cy={285} r={4} fill="#ffd400" />
          </motion.g>

          {/* Power cable */}
          <motion.path
            d="M300,270 C345,320 345,400 300,430"
            fill="none"
            stroke="#ffd400"
            strokeWidth={4}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: cableDash, opacity: cableOpacity }}
          />

          {/* Front fans */}
          <motion.g style={{ opacity: fan1Opacity, scale: fan1Scale }}>
            <g transform="translate(150,430)">
              <FanIcon r={26} />
            </g>
          </motion.g>
          <motion.g style={{ opacity: fan2Opacity, scale: fan2Scale }}>
            <g transform="translate(250,430)">
              <FanIcon r={26} />
            </g>
          </motion.g>

          {/* Glass side panel closing */}
          <motion.rect
            x={90}
            y={30}
            width={220}
            height={440}
            rx={18}
            fill="url(#panelGradient)"
            stroke="#e0231c"
            strokeWidth={1.5}
            style={{ x: panelX, opacity: panelOpacity }}
          />
          <defs>
            <linearGradient id="panelGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0231c" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
          </defs>

          {/* Power LED */}
          <motion.g style={{ opacity: ledOpacity }}>
            <motion.circle
              cx={200}
              cy={44}
              r={5}
              fill="#ffd400"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>
        </svg>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="relative z-10 mt-4 max-w-md text-center text-neutral-600"
        >
          Cada componente elegido y ensamblado con cuidado — listo para encender.
        </motion.p>
      </div>
    </section>
  )
}
