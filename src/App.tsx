import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { FloatingWhatsAppButton } from './components/WhatsAppButton'
import { Home } from './pages/Home'
import { Servicios } from './pages/Servicios'
import { Portafolio } from './pages/Portafolio'
import { Nosotros } from './pages/Nosotros'
import { Contacto } from './pages/Contacto'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-brand-red"
      style={{ scaleX }}
    />
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  )
}

export default App
