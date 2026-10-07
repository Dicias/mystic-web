import { Target, Eye, ShieldCheck, Users, Clock3 } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { PageHeader } from '../components/PageHeader'
import { Eyebrow } from '../components/Eyebrow'
import { StatCounter } from '../components/StatCounter'
import { FinalCTA } from '../components/FinalCTA'

// TODO: contenido de ejemplo — reemplazar con la historia y valores reales de MySaC.
const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Confianza',
    description: 'Diagnósticos honestos y transparencia en cada cotización.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Trato personalizado, explicando cada solución en términos claros.',
  },
  {
    icon: Clock3,
    title: 'Compromiso',
    description: 'Cumplimos los tiempos acordados en cada servicio.',
  },
]

export function Nosotros() {
  return (
    <div>
      <PageHeader
        index="03"
        eyebrow="Nosotros"
        title="Gente que entiende tu"
        accent="tecnología"
        description="Un equipo dedicado a mantener tu tecnología funcionando, sin complicaciones."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-28 sm:px-6 lg:grid-cols-12 lg:px-8">
        <SectionReveal className="lg:col-span-4">
          <Eyebrow>Nuestra historia</Eyebrow>
        </SectionReveal>
        <SectionReveal delay={0.1} className="lg:col-span-8">
          <p className="text-balance text-2xl leading-[1.4] tracking-[-0.01em] text-neutral-200 sm:text-3xl">
            MySaC nació de la pasión por la tecnología y las ganas de ofrecer un servicio técnico{' '}
            <span className="font-serif italic text-brand-red">confiable</span> en Querétaro.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Con el tiempo, fuimos ampliando nuestros servicios de reparación de equipos hacia el armado
            de PCs personalizadas, instalación de redes y sistemas de videovigilancia, siempre bajo el
            mismo compromiso: resolver los problemas tecnológicos de nuestros clientes de forma rápida y
            honesta.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            <StatCounter value={12} suffix="+" label="Años" />
            <StatCounter value={1500} suffix="+" label="Equipos" />
            <StatCounter value={300} suffix="+" label="Clientes" />
            <StatCounter value={100} suffix="+" label="Redes" />
          </div>
        </SectionReveal>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          {[
            {
              icon: Target,
              title: 'Misión',
              body: 'Brindar soluciones tecnológicas confiables y accesibles para personas y negocios, desde la reparación de un equipo hasta la infraestructura completa de red y seguridad.',
            },
            {
              icon: Eye,
              title: 'Visión',
              body: 'Ser el proveedor de referencia en soporte técnico, redes y videovigilancia en la región, reconocido por la calidad y cercanía de nuestro servicio.',
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <SectionReveal
              key={title}
              delay={i * 0.1}
              className={`px-4 py-20 sm:px-10 lg:px-16 ${i === 0 ? 'border-b border-white/10 md:border-b-0 md:border-r' : ''}`}
            >
              <Icon className="text-brand-red" size={28} strokeWidth={1.5} />
              <h2 className="mt-8 font-serif text-5xl italic text-white">{title}</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">{body}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <SectionReveal>
          <Eyebrow>Valores</Eyebrow>
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Lo que nos{' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-brand-red">define</span>
          </h2>
        </SectionReveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }, i) => (
            <SectionReveal key={title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-transparent p-8 transition-colors duration-300 hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-brand-red">
                    <Icon size={22} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-12 text-2xl font-medium tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  )
}
