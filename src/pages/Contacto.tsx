import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { PageHeader } from '../components/PageHeader'
import { VisitSection } from '../components/VisitSection'
import { SERVICES } from '../data/services'
import { BUSINESS } from '../data/business'
import { buildWhatsAppLink } from '../lib/whatsapp'

const FIELD =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-base text-white outline-none transition-colors placeholder:text-neutral-600 hover:border-white/20 focus:border-brand-red focus:bg-white/[0.05]'
const LABEL = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400'

export function Contacto() {
  const [name, setName] = useState('')
  const [service, setService] = useState(SERVICES[0].title)
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const text = [
      `Hola MySaC, mi nombre es ${name || '(sin nombre)'}.`,
      `Me interesa: ${service}.`,
      message ? `Mensaje: ${message}` : null,
    ]
      .filter(Boolean)
      .join(' ')
    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <PageHeader
        index="04"
        eyebrow="Contacto"
        title="Hablemos de tu"
        accent="proyecto"
        description="Cuéntanos qué necesitas y te respondemos por WhatsApp, normalmente el mismo día."
      />

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:px-8">
        <SectionReveal className="lg:col-span-4">
          <ul className="space-y-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
            {[
              { label: 'WhatsApp', value: BUSINESS.phoneDisplay, href: buildWhatsAppLink('Hola MySaC') },
              { label: 'Teléfono', value: BUSINESS.phoneDisplay, href: `tel:+52${BUSINESS.phoneDisplay.replace(/\s/g, '')}` },
              { label: 'Cómo llegar', value: 'Desarrollo San Pablo, Qro.', href: BUSINESS.mapsUrl },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-brand-black p-6 transition-colors hover:bg-neutral-950"
                >
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-lg text-white">{item.value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-red"
                  />
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.1} className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-transparent p-6 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={LABEL}>
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className={FIELD}
                />
              </div>
              <div>
                <label htmlFor="service" className={LABEL}>
                  Servicio de interés
                </label>
                <select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${FIELD} cursor-pointer`}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title} className="bg-neutral-950 text-white">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className={LABEL}>
                Mensaje
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Cuéntanos brevemente qué necesitas"
                className={`${FIELD} resize-none`}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-500">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
              <button
                type="submit"
                className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-red px-7 py-3 text-[15px] font-medium text-white shadow-[0_10px_40px_-10px_rgba(224,35,28,0.7)] transition-colors hover:bg-brand-red-dark"
              >
                Enviar por WhatsApp
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </SectionReveal>
      </section>

      <VisitSection index="—" />
    </div>
  )
}
