import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { CircuitBackground } from '../CircuitBackground'
import { PcCaseScene } from './PcCaseScene'

export function PcAssembly3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.9, 1], [1, 1, 1, 0])
  const captionOpacity = useTransform(scrollYProgress, [0.86, 1], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.86, 1], [24, 0])

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

        <div className="relative z-10 h-[52vh] w-full sm:h-[58vh]">
          <Canvas
            dpr={[1, 2]}
            shadows
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          >
            <PcCaseScene scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

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
