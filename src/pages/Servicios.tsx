import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { WhatsAppCTA } from '../components/WhatsAppButton'
import { PageHeader } from '../components/PageHeader'
import { FinalCTA } from '../components/FinalCTA'
import { SERVICES } from '../data/services'
import { quoteMessage } from '../lib/whatsapp'
import { getLenis } from '../lib/lenis'

export function Servicios() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (!el) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: -100 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <div>
      <PageHeader
        index="01"
        eyebrow="Servicios"
        title="Soluciones que"
        accent="resuelven"
        description="Todo lo que tu equipo, tu red o tu negocio necesitan, con un mismo proveedor de confianza."
      >
        <nav className="mt-10 flex flex-wrap gap-2" aria-label="Servicios">
          {SERVICES.map((service, i) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(service.id)
                if (!el) return
                const lenis = getLenis()
                if (lenis) lenis.scrollTo(el, { offset: -100 })
                else el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
            >
              <span className="mr-2 font-mono text-[11px] text-brand-red">{String(i + 1).padStart(2, '0')}</span>
              {service.title.split(' ').slice(0, 3).join(' ')}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {SERVICES.map((service, i) => {
          const Icon = service.icon
          return (
            <section
              key={service.id}
              id={service.id}
              className="grid scroll-mt-28 gap-10 border-b border-white/10 py-20 last:border-b-0 sm:py-28 lg:grid-cols-12"
            >
              <SectionReveal className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-6xl italic leading-none text-brand-red">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
                      <Icon size={22} />
                    </span>
                  </div>
                  <h2 className="text-balance mt-8 text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">
                    {service.title}
                  </h2>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
                <p className="text-xl leading-relaxed text-neutral-300">{service.description}</p>
                <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 bg-brand-black p-5 text-[15px] text-neutral-200">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <WhatsAppCTA message={quoteMessage(service.title)} className="mt-10">
                  Cotizar este servicio
                </WhatsAppCTA>
              </SectionReveal>
            </section>
          )
        })}
      </div>

      <FinalCTA />
    </div>
  )
}
