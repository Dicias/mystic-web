import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpeg'
import { buildWhatsAppLink } from '../lib/whatsapp'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

const WHATSAPP_HREF = buildWhatsAppLink('Hola MySaC, me gustaría más información.')

/** Floating glass pill: transparent over the hero, firms up once the page scrolls. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled || menuOpen
            ? 'border-white/10 bg-neutral-950/75 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-14 items-center justify-between pl-3 pr-2 sm:h-16 sm:pl-4">
          <NavLink to="/" className="flex items-center gap-3" aria-label="MySaC — Inicio">
            <img src={logo} alt="" className="h-8 w-auto rounded-md bg-white object-contain p-0.5 sm:h-9" />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1.5 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark sm:inline-flex"
            >
              Cotizar
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white hover:bg-white/10 md:hidden"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Principal móvil"
            >
              <div className="flex flex-col gap-1 border-t border-white/10 p-3">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.04 * i }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3.5 text-base ${
                          isActive ? 'bg-white/[0.06] text-white' : 'text-neutral-300'
                        }`
                      }
                    >
                      {link.label}
                      <span className="font-mono text-[11px] text-neutral-600">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </NavLink>
                  </motion.div>
                ))}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-red py-3.5 font-medium text-white"
                >
                  Cotizar por WhatsApp <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
