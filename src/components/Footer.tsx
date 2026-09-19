import { Link } from 'react-router-dom'
import { MapPin, Clock, Phone } from 'lucide-react'
import logo from '../assets/logo.jpeg'
import { BUSINESS } from '../data/business'
import { AmbientGlow } from './AmbientGlow'
import { SectionReveal } from './SectionReveal'

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

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-black text-neutral-300">
      <AmbientGlow tone="dark" />
      <SectionReveal className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <img src={logo} alt="MySaC" className="h-14 w-auto bg-white p-1 object-contain" />
          <p className="mt-4 text-sm text-neutral-400">{BUSINESS.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-red">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-brand-red">Servicios</Link></li>
            <li><Link to="/portafolio" className="hover:text-brand-red">Portafolio</Link></li>
            <li><Link to="/nosotros" className="hover:text-brand-red">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-brand-red">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>{BUSINESS.phoneDisplay}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>{BUSINESS.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Síguenos
          </h4>
          <div className="flex gap-3">
            <a
              href={BUSINESS.socials.facebook}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-brand-red"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={BUSINESS.socials.instagram}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-brand-red"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </SectionReveal>

      <div className="relative z-10 border-t border-neutral-800 px-4 py-4 text-center text-xs text-neutral-500 sm:px-6">
        © {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
