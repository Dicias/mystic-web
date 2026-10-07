import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { type WorksWheelItem } from '@/components/ui/works-wheel'
import { ScrollWorksWheel } from '../components/ScrollWorksWheel'
import { SectionReveal } from '../components/SectionReveal'
import { StatCounter } from '../components/StatCounter'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { WhatsAppCTA } from '../components/WhatsAppButton'
import { CircuitBackground } from '../components/CircuitBackground'
import { Spotlight } from '../components/Spotlight'
import { HardwareBlueprint } from '../components/HardwareBlueprint'
import { Marquee } from '../components/Marquee'
import { Eyebrow, OpenBadge } from '../components/Eyebrow'
import { VisitSection } from '../components/VisitSection'
import { FinalCTA } from '../components/FinalCTA'
import { SERVICES, type Service } from '../data/services'
import { PORTFOLIO_ITEMS } from '../data/portfolioItems'
import { useIsOpen } from '../lib/hours'
import { LOADING_DURATION_MS } from '../components/LoadingScreen'

const EASE = [0.22, 1, 0.36, 1] as const
const MARQUEE_ITEMS = ['Reparación', 'PCs a la medida', 'Redes', 'Videovigilancia', 'Soporte', 'Mantenimiento']

const WORKS: WorksWheelItem[] = PORTFOLIO_ITEMS.map((item) => ({
  title: item.title,
  image: item.image,
}))

const STEPS = [
  { title: 'Diagnóstico', body: 'Revisamos tu equipo o instalación sin costo y te explicamos qué está pasando, sin tecnicismos.' },
  { title: 'Cotización clara', body: 'Precio cerrado antes de empezar. Sin cargos sorpresa ni piezas que no necesitas.' },
  { title: 'Trabajo con garantía', body: 'Componentes de calidad e instalación cuidada. Todo nuestro trabajo tiene garantía.' },
  { title: 'Entrega y soporte', body: 'Te entregamos funcionando y seguimos disponibles por WhatsApp para lo que surja.' },
]

// The loading screen only covers the very first render of the app; after that the
// hero should animate in immediately when navigating back to Inicio.
let firstVisit = true

export function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const open = useIsOpen()
  const [introDelay] = useState(() => (firstVisit ? LOADING_DURATION_MS / 1000 - 0.2 : 0))

  useEffect(() => {
    firstVisit = false
  }, [])

  // The blueprint assembles once on arrival instead of being scrubbed by a pinned
  // scroll section — no pin means no dead scroll distance and no empty black block.
  const assembly = useMotionValue(0)
  useEffect(() => {
    const controls = animate(assembly, 1, { duration: 2.4, delay: introDelay + 0.3, ease: EASE })
    return () => controls.stop()
  }, [assembly, introDelay])

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -200])

  function handleHeroPointerMove(e: ReactPointerEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    heroRef.current?.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    heroRef.current?.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: introDelay + i * 0.08, ease: EASE },
  })

  return (
    <div>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section
        ref={heroRef}
        onPointerMove={handleHeroPointerMove}
        className="relative flex min-h-[100svh] flex-col overflow-hidden"
      >
        <div className="absolute inset-0">
          <CircuitBackground tone="dark" className="opacity-70" />
        </div>
        <Spotlight size={340} />
        <div className="bg-hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_40%,black_10%,transparent_70%)]" />
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-brand-red/20 blur-[140px]"
        />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-brand-yellow/[0.06] blur-[120px]" />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-28 sm:px-6 sm:pt-36 lg:px-8"
        >
          <motion.div {...reveal(0)} className="flex flex-wrap items-center gap-3">
            <OpenBadge open={open} />
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 sm:inline">
              Santiago de Querétaro · MX
            </span>
          </motion.div>

          <div className="mt-10 grid flex-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-[clamp(2.75rem,6.4vw,6.25rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
                <motion.span {...reveal(1)} className="block">
                  Tecnología que
                </motion.span>
                <motion.span {...reveal(2)} className="block">
                  <span className="font-serif font-normal italic tracking-[-0.03em] text-brand-red">funciona</span>,
                  cuando
                </motion.span>
                <motion.span {...reveal(3)} className="block">
                  la necesitas.
                </motion.span>
              </h1>
              <motion.p {...reveal(4)} className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-400">
                Reparación, PCs armadas a la medida, redes y videovigilancia. Un solo taller de confianza
                para tu casa o tu negocio.
              </motion.p>
              <motion.div {...reveal(5)} className="mt-10 flex flex-wrap gap-3">
                <WhatsAppCTA message="Hola MySaC, me gustaría solicitar una cotización.">
                  Solicitar cotización
                </WhatsAppCTA>
                <Link
                  to="/servicios"
                  className="group inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-[15px] font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  Ver servicios
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: introDelay + 0.2, ease: EASE }}
              className="flex justify-center lg:col-span-5 lg:justify-end"
            >
              <HardwareBlueprint progress={assembly} />
            </motion.div>
          </div>

          <motion.div
            {...reveal(6)}
            className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            <StatCounter value={12} suffix="+" label="Años de experiencia" />
            <StatCounter value={1500} suffix="+" label="Equipos reparados" />
            <StatCounter value={300} suffix="+" label="Clientes satisfechos" />
            <StatCounter value={100} suffix="+" label="Redes instaladas" />
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────────────── Ticker ───────────────────────── */}
      <div className="border-y border-white/10 py-8">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* ───────────────────────── Services ───────────────────────── */}
      <section className="relative py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="01"
            eyebrow="Servicios"
            title="Todo lo que tu equipo"
            accent="necesita"
            body="Cuatro especialidades bajo el mismo techo, para que no tengas que buscar un proveedor distinto cada vez."
            link={{ to: '/servicios', label: 'Todos los servicios' }}
          />

          <div className="mt-16 grid gap-4 lg:grid-cols-12">
            {SERVICES.map((service, i) => (
              <SectionReveal
                key={service.id}
                delay={i * 0.06}
                className={
                  ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-12'][i]
                }
              >
                <BentoCard service={service} index={i} featured={i === 0} wide={i === 3} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Works wheel ───────────────────────── */}
      <section className="relative border-t border-white/10 pt-28 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="02"
            eyebrow="Proyectos"
            title="Trabajo"
            accent="reciente"
            body="Sigue bajando: la rueda gira con el scroll. También puedes elegir un proyecto del índice."
            link={{ to: '/portafolio', label: 'Ver portafolio' }}
          />
        </div>
        <div className="relative mt-6">
          <ScrollWorksWheel items={WORKS} label="Proyectos '26" />
        </div>
      </section>

      {/* ───────────────────────── Process ───────────────────────── */}
      <section className="relative py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="03"
            eyebrow="Proceso"
            title="Así"
            accent="trabajamos"
            body="Sin vueltas: sabes qué tiene tu equipo, cuánto cuesta y cuándo está listo antes de que toquemos un tornillo."
          />
          <ol className="mt-16 grid border-y border-white/10 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="group relative flex flex-col border-white/10 p-8 transition-colors duration-300 hover:bg-white/[0.02] max-lg:border-b max-lg:last:border-b-0 md:max-lg:odd:border-r lg:border-l lg:first:border-l-0"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px h-px origin-left bg-brand-red"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE }}
                />
                <span className="font-serif text-7xl italic leading-none text-white/15 transition-colors duration-300 group-hover:text-brand-red">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-10 text-xl font-medium tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── Testimonials ───────────────────────── */}
      <section className="relative border-t border-white/10 py-28 sm:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <SectionReveal className="lg:col-span-4">
            <Eyebrow index="04">Clientes</Eyebrow>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-neutral-400">
              Negocios, oficinas y familias de Querétaro que ya confían su tecnología en nosotros.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-8">
            <TestimonialCarousel />
          </SectionReveal>
        </div>
      </section>

      <VisitSection index="05" />
      <FinalCTA />
    </div>
  )
}

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: string
  accent: string
  body?: string
  link?: { to: string; label: string }
}

function SectionHeader({ index, eyebrow, title, accent, body, link }: SectionHeaderProps) {
  return (
    <SectionReveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-6xl">
          {title}{' '}
          <span className="font-serif font-normal italic tracking-[-0.02em] text-brand-red">{accent}</span>
        </h2>
      </div>
      <div className="lg:col-span-5">
        {body && <p className="max-w-md text-[15px] leading-relaxed text-neutral-400">{body}</p>}
        {link && (
          <Link
            to={link.to}
            className="group mt-5 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-medium text-white transition-colors hover:border-brand-red hover:text-brand-red"
          >
            {link.label}
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </SectionReveal>
  )
}

interface BentoCardProps {
  service: Service
  index: number
  featured?: boolean
  wide?: boolean
}

function BentoCard({ service, index, featured, wide }: BentoCardProps) {
  const Icon = service.icon

  function handlePointerMove(e: ReactPointerEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      to={`/servicios#${service.id}`}
      onPointerMove={handlePointerMove}
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-7 transition-colors duration-300 hover:border-white/20 sm:p-9 ${
        featured ? 'min-h-[30rem]' : 'min-h-[16rem]'
      }`}
    >
      {/* Pointer-following glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(224,35,28,0.14), transparent 60%)',
        }}
      />
      <Icon
        aria-hidden="true"
        strokeWidth={0.6}
        className={`pointer-events-none absolute text-white/[0.04] transition-all duration-500 group-hover:text-brand-red/15 ${
          featured
            ? '-bottom-16 -right-16 h-[26rem] w-[26rem] group-hover:-rotate-6'
            : '-bottom-10 -right-10 h-56 w-56 group-hover:-rotate-6'
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-brand-red">
          <Icon size={22} />
        </span>
        <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-neutral-500">
          {String(index + 1).padStart(2, '0')}
          <ArrowUpRight
            size={18}
            className="text-neutral-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </span>
      </div>

      <div className={`relative mt-auto pt-12 ${wide ? 'lg:flex lg:items-end lg:justify-between lg:gap-12' : ''}`}>
        <div>
          <h3
            className={`text-balance font-medium tracking-[-0.03em] text-white ${
              featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
            }`}
          >
            {service.title}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-400">{service.shortDescription}</p>
        </div>
        {(featured || wide) && (
          <ul className={`flex flex-wrap gap-2 ${wide ? 'mt-6 lg:mt-0 lg:max-w-md lg:justify-end' : 'mt-8'}`}>
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300"
              >
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
