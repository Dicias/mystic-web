import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { ServiceCard } from '../components/ServiceCard'
import { StatCounter } from '../components/StatCounter'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { WhatsAppCTA } from '../components/WhatsAppButton'
import { PcAssembly } from '../components/PcAssembly'
import { CircuitBackground } from '../components/CircuitBackground'
import { useShouldRender3D } from '../components/pc3d/useShouldRender3D'
import { SERVICES } from '../data/services'
import { BUSINESS } from '../data/business'

const PcAssembly3D = lazy(() =>
  import('../components/pc3d/PcAssembly3D').then((m) => ({ default: m.PcAssembly3D })),
)

export function Home() {
  const navigate = useNavigate()
  const shouldRender3D = useShouldRender3D()

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
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
            <button
              type="button"
              onClick={() => navigate('/servicios')}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver servicios <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {shouldRender3D ? (
        <Suspense fallback={<PcAssembly />}>
          <PcAssembly3D />
        </Suspense>
      ) : (
        <PcAssembly />
      )}

      <section className="relative overflow-hidden bg-white">
        <CircuitBackground tone="light" className="opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionReveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-brand-black">Nuestros servicios</h2>
            <p className="mt-3 text-neutral-600">Soluciones completas para tu equipo y tu negocio.</p>
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <SectionReveal key={service.id} delay={i * 0.08}>
                <ServiceCard
                  service={service}
                  onSelect={(s) => navigate(`/servicios#${s.id}`)}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-16 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
          <StatCounter value={12} suffix="+" label="Años de experiencia" />
          <StatCounter value={1500} suffix="+" label="Equipos reparados" />
          <StatCounter value={300} suffix="+" label="Clientes satisfechos" />
          <StatCounter value={100} suffix="+" label="Redes instaladas" />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <CircuitBackground tone="light" className="opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionReveal>
            <TestimonialCarousel />
          </SectionReveal>
        </div>
      </section>

      <section className="bg-brand-red">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
          <h3 className="text-2xl font-extrabold text-white">
            ¿Tu equipo necesita mantenimiento o quieres una PC a tu medida?
          </h3>
          <WhatsAppCTA
            message="Hola MySaC, me gustaría solicitar una cotización."
            variant="inverse"
          >
            Escríbenos por WhatsApp
          </WhatsAppCTA>
        </div>
      </section>
    </div>
  )
}
