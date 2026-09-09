import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpeg'
import { WhatsAppCTA } from './WhatsAppButton'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-shadow ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <NavLink to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="MySaC" className="h-12 w-auto object-contain sm:h-14" />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <WhatsAppCTA message="Hola MySaC, me gustaría más información." className="px-4 py-2 text-sm">
            WhatsApp
          </WhatsAppCTA>
        </nav>

        <button
          type="button"
          className="text-brand-black md:hidden"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="flex flex-col gap-1 overflow-hidden border-t border-neutral-100 bg-white px-4 pb-4 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-semibold ${
                    isActive ? 'bg-brand-red/10 text-brand-red' : 'text-brand-black'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <WhatsAppCTA
              message="Hola MySaC, me gustaría más información."
              className="mt-2 w-full py-3 text-sm"
            >
              WhatsApp
            </WhatsAppCTA>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
