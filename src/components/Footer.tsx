import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import logo from '../assets/logo.jpeg'
import { BUSINESS } from '../data/business'
import { buildWhatsAppLink } from '../lib/whatsapp'

// lucide-react dropped brand/social icons, so these two are small inline SVGs.
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-black text-neutral-400">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-red/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={logo} alt="MySaC" className="h-11 w-auto rounded-md bg-white object-contain p-1" />
            <p className="mt-6 max-w-sm text-balance text-2xl font-medium leading-snug tracking-tight text-white">
              Tu tecnología, en manos{' '}
              <span className="font-serif font-normal italic text-brand-red">expertas</span>.
            </p>
            <a
              href={buildWhatsAppLink('Hola MySaC, me gustaría solicitar una cotización.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Escríbenos por WhatsApp
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Navegación</h4>
              <ul className="space-y-3 text-sm">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`tel:+52${BUSINESS.phoneDisplay.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                    {BUSINESS.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    {BUSINESS.address}
                  </a>
                </li>
                <li>{BUSINESS.hours}</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">Síguenos</h4>
              <div className="flex gap-2">
                <a
                  href={BUSINESS.socials.facebook}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-neutral-300 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={BUSINESS.socials.instagram}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-neutral-300 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized wordmark, cropped by the page edge. */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-20 select-none bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text text-center text-[24vw] font-semibold leading-[0.75] tracking-[-0.06em] text-transparent lg:text-[20rem]"
        >
          MySaC
        </p>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-600 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.</span>
          <span>Santiago de Querétaro · MX</span>
        </div>
      </div>
    </footer>
  )
}
