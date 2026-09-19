import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { CircuitBackground } from '../components/CircuitBackground'
import { AmbientGlow } from '../components/AmbientGlow'
import { TiltCard } from '../components/TiltCard'
import { WhatsAppCTA } from '../components/WhatsAppButton'
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
      lenis.scrollTo(el, { offset: -20 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <AmbientGlow tone="light" />
      <CircuitBackground tone="light" className="opacity-40" />
      <div className="relative z-10">
      <SectionReveal className="mb-14 text-center">
        <h1 className="text-4xl font-extrabold text-brand-black">Nuestros Servicios</h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Todo lo que tu equipo, tu red o tu negocio necesitan, con un mismo proveedor de confianza.
        </p>
      </SectionReveal>

      <div className="space-y-16">
        {SERVICES.map((service, i) => {
          const Icon = service.icon
          const reversed = i % 2 === 1
          return (
            <SectionReveal key={service.id} direction={reversed ? 'right' : 'left'}>
              <div
                id={service.id}
                className={`flex scroll-mt-24 flex-col items-start gap-8 md:flex-row md:items-center ${
                  reversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <TiltCard className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                  <Icon size={44} />
                </TiltCard>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brand-black">{service.title}</h2>
                  <p className="mt-3 text-neutral-600">{service.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-neutral-700">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-red" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <WhatsAppCTA message={quoteMessage(service.title)} className="mt-6">
                    Cotizar este servicio
                  </WhatsAppCTA>
                </div>
              </div>
            </SectionReveal>
          )
        })}
      </div>
      </div>
    </div>
  )
}
