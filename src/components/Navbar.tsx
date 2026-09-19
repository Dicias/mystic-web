import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
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

  const { scrollY } = useScroll()
  const paddingY = useTransform(scrollY, [0, 80], [10, 4])
  const logoHeight = useTransform(scrollY, [0, 80], [56, 42])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? 'bg-white/85 shadow-md backdrop-blur-md' : 'bg-white shadow-none'
      }`}
    >
      <motion.div
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
        className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <NavLink to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <motion.img
            src={logo}
            alt="MySaC"
            style={{ height: logoHeight }}
            className="w-auto object-contain"
          />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative inline-block py-1">
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-red"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </span>
              )}
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
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="flex flex-col gap-1 overflow-hidden border-t border-neutral-100 bg-white px-4 pb-4 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-sm font-semibold ${
                      isActive ? 'bg-brand-red/10 text-brand-red' : 'text-brand-black'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
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
    </motion.header>
  )
}
