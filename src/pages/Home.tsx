import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { ServiceCard } from '../components/ServiceCard'
import { StatCounter } from '../components/StatCounter'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { WhatsAppCTA } from '../components/WhatsAppButton'
import { CircuitBackground } from '../components/CircuitBackground'
import { AmbientGlow } from '../components/AmbientGlow'
import { Spotlight } from '../components/Spotlight'
import { DiagnosticPanel } from '../components/DiagnosticPanel'
import { Marquee } from '../components/Marquee'
import { SERVICES } from '../data/services'
import { BUSINESS } from '../data/business'

const MARQUEE_ITEMS = SERVICES.map((s) => s.title)
const HERO_PIN_VH = 175

export function Home() {
  const navigate = useNavigate()
  const pinRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  // Drives the whole hero: 0 = pinned section just locked in place, 1 = it's about
  // to unstick and scroll away — this is what makes the motion feel scroll-scrubbed
  // instead of a one-off viewport-triggered animation.
  const { scrollYProgress: pinProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  })

  // First ~55% of the pin: the section holds still while its layers drift at
  // different depths. Last stretch: it shrinks, rounds off and dissolves,
  // revealing the next section stacked right behind it — no hard-cut divider needed.
  const heroScale = useTransform(pinProgress, [0.55, 1], [1, 0.82])
  const heroOpacity = useTransform(pinProgress, [0.6, 1], [1, 0])
  const heroRadius = useTransform(pinProgress, [0.55, 1], [0, 40])

  const headlineY = useTransform(pinProgress, [0, 1], [0, -170])
  const panelY = useTransform(pinProgress, [0, 1], [0, 130])
  const panelRotate = useTransform(pinProgress, [0, 1], [0, -6])
  const circuitY = useTransform(pinProgress, [0, 1], [0, -70])
  const glowRedY = useTransform(pinProgress, [0, 1], [0, -230])
  const glowRedScale = useTransform(pinProgress, [0, 1], [1, 1.6])
  const glowYellowY = useTransform(pinProgress, [0, 1], [0, 170])

  function handleHeroPointerMove(e: ReactPointerEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    heroRef.current?.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    heroRef.current?.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div>
      <div ref={pinRef} style={{ height: `${HERO_PIN_VH}vh` }} className="relative">
        <motion.section
          ref={heroRef}
          onPointerMove={handleHeroPointerMove}
          style={{ scale: heroScale, opacity: heroOpacity, borderRadius: heroRadius }}
          className="sticky top-0 flex h-screen items-center overflow-hidden bg-brand-black text-white"
        >
          <motion.div style={{ y: circuitY }} className="absolute inset-0">
            <CircuitBackground tone="dark" className="opacity-80" />
          </motion.div>
          <Spotlight />

          <motion.div
            style={{ y: glowRedY, scale: glowRedScale }}
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl"
          />
          <motion.div
            style={{ y: glowYellowY }}
            className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-yellow/10 blur-3xl"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <motion.div style={{ y: headlineY }}>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red"
              >
                {BUSINESS.tagline}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl"
              >
                Tecnología que funciona, cuando la necesitas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 max-w-xl text-lg text-neutral-300"
              >
                Reparación de equipos, armado de PCs personalizadas, redes e infraestructura, y
                sistemas de videovigilancia — todo en un solo lugar.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <WhatsAppCTA message="Hola MySaC, me gustaría solicitar una cotización.">
                  Solicitar cotización
                </WhatsAppCTA>
                <motion.button
                  type="button"
                  onClick={() => navigate('/servicios')}
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ver servicios <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: panelY, rotate: panelRotate }}
              className="flex justify-center lg:justify-end"
            >
              <DiagnosticPanel />
            </motion.div>
          </div>
        </motion.section>
      </div>

      <div className="relative overflow-hidden border-y border-white/10 bg-brand-black py-6">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <section className="relative overflow-hidden bg-white">
        <AmbientGlow tone="light" />
        <CircuitBackground tone="light" className="opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionReveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-brand-black">Nuestros servicios</h2>
            <p className="mt-3 text-neutral-600">Soluciones completas para tu equipo y tu negocio.</p>
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <SectionReveal key={service.id} delay={i * 0.08} direction="scale">
                <ServiceCard
                  service={service}
                  onSelect={(s) => navigate(`/servicios#${s.id}`)}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-black py-16 text-white">
        <AmbientGlow tone="dark" />
        <SectionReveal
          direction="scale"
          className="relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6"
        >
          <StatCounter value={12} suffix="+" label="Años de experiencia" />
          <StatCounter value={1500} suffix="+" label="Equipos reparados" />
          <StatCounter value={300} suffix="+" label="Clientes satisfechos" />
          <StatCounter value={100} suffix="+" label="Redes instaladas" />
        </SectionReveal>
      </section>

      <section className="relative overflow-hidden">
        <CircuitBackground tone="light" className="opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionReveal>
            <TestimonialCarousel />
          </SectionReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-red">
        <motion.div
          className="pointer-events-none absolute -left-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 20, 0], y: ['-50%', '-45%', '-50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <SectionReveal className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
          <h3 className="text-2xl font-extrabold text-white">
            ¿Tu equipo necesita mantenimiento o quieres una PC a tu medida?
          </h3>
          <WhatsAppCTA
            message="Hola MySaC, me gustaría solicitar una cotización."
            variant="inverse"
          >
            Escríbenos por WhatsApp
          </WhatsAppCTA>
        </SectionReveal>
      </section>
    </div>
  )
}
