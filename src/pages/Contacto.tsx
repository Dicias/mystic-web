import { useState, type FormEvent } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { CircuitBackground } from '../components/CircuitBackground'
import { AmbientGlow } from '../components/AmbientGlow'
import { SERVICES } from '../data/services'
import { BUSINESS } from '../data/business'
import { buildWhatsAppLink } from '../lib/whatsapp'

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

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&output=embed`

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <AmbientGlow tone="light" />
      <CircuitBackground tone="light" className="opacity-40" />
      <div className="relative z-10">
      <SectionReveal className="mb-14 text-center">
        <h1 className="text-4xl font-extrabold text-brand-black">Contáctanos</h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Cuéntanos qué necesitas y te contactamos por WhatsApp al instante.
        </p>
      </SectionReveal>

      <div className="grid gap-12 md:grid-cols-2">
        <SectionReveal direction="left">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-neutral-200 p-8">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold text-brand-black">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label htmlFor="service" className="mb-1 block text-sm font-semibold text-brand-black">
                Servicio de interés
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-brand-red"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-semibold text-brand-black">
                Mensaje
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Cuéntanos brevemente qué necesitas"
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-brand-red"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-red-dark"
            >
              Enviar por WhatsApp
            </button>
            <p className="text-center text-xs text-neutral-500">
              Al enviar se abrirá WhatsApp con tu mensaje listo para confirmar.
            </p>
          </form>
        </SectionReveal>

        <SectionReveal direction="right" delay={0.1} className="space-y-6">
          <div className="space-y-4 rounded-2xl bg-neutral-50 p-8">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 shrink-0 text-brand-red" size={20} />
              <span className="text-neutral-700">{BUSINESS.phoneDisplay}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-brand-red" size={20} />
              <span className="text-neutral-700">{BUSINESS.address}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 shrink-0 text-brand-red" size={20} />
              <span className="text-neutral-700">{BUSINESS.hours}</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <iframe
              title="Ubicación de MySaC"
              src={mapSrc}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </SectionReveal>
      </div>
      </div>
    </div>
  )
}
