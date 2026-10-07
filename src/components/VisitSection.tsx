import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { LocationMap } from '@/components/ui/expand-map'
import { Eyebrow, OpenBadge } from './Eyebrow'
import { SectionReveal } from './SectionReveal'
import { WhatsAppCTA } from './WhatsAppButton'
import { BUSINESS } from '../data/business'
import { useIsOpen } from '../lib/hours'

// Approximate centre of Desarrollo San Pablo; shown as a label, not used for routing.
const COORDINATES = '20.62° N, 100.41° W'

interface VisitSectionProps {
  index?: string
}

/** Address, hours and the expandable map widget set on a radar-style panel. */
export function VisitSection({ index = '05' }: VisitSectionProps) {
  const open = useIsOpen()

  const rows = [
    { label: 'Dirección', value: BUSINESS.address, href: BUSINESS.mapsUrl },
    { label: 'Horario', value: BUSINESS.hours },
    {
      label: 'Teléfono',
      value: BUSINESS.phoneDisplay,
      href: `tel:+52${BUSINESS.phoneDisplay.replace(/\s/g, '')}`,
    },
  ]

  return (
    <section className="relative border-t border-white/10 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <SectionReveal>
          <Eyebrow index={index}>Ubicación</Eyebrow>
          <h2 className="text-balance mt-6 text-4xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-6xl">
            Visítanos en{' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-brand-red">Querétaro</span>
          </h2>
          <OpenBadge open={open} className="mt-8" />

          <dl className="mt-10 border-t border-white/10">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-3 gap-4 border-b border-white/10 py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">{row.label}</dt>
                <dd className="col-span-2 text-[15px] leading-relaxed text-neutral-200">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand-red"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              Cómo llegar
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <WhatsAppCTA message="Hola MySaC, quiero agendar una visita al taller." variant="ghost">
              Agendar visita
            </WhatsAppCTA>
          </div>
        </SectionReveal>

        <SectionReveal direction="scale" delay={0.1}>
          <div className="relative flex aspect-square max-h-[36rem] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="bg-hairline-grid absolute inset-0 [mask-image:radial-gradient(circle,black_20%,transparent_70%)]" />
            {[1, 2, 3, 4].map((ring) => (
              <motion.span
                key={ring}
                aria-hidden="true"
                className="absolute rounded-full border border-white/[0.07]"
                style={{ width: `${ring * 22}%`, height: `${ring * 22}%` }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, delay: ring * 0.5, ease: 'easeInOut' }}
              />
            ))}
            {/* Radar sweep */}
            <motion.div
              aria-hidden="true"
              className="absolute h-[88%] w-[88%] rounded-full bg-[conic-gradient(from_0deg,rgba(224,35,28,0.18),transparent_25%)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {COORDINATES}
            </span>
            <span className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              QRO / MX
            </span>

            <LocationMap
              location="Desarrollo San Pablo, Qro."
              coordinates={COORDINATES}
              status={open ? 'Abierto' : 'Cerrado'}
              hint="Click para expandir"
              className="relative z-10"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
