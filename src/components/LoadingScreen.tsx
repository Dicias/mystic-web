import { motion } from 'framer-motion'
import { FluidParticlesBackground } from './ui/fluid-particles-background'
import CloudLoader from './ui/quantum-cloud-loader'
import logo from '../assets/logo.jpeg'

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <FluidParticlesBackground particleCount={900}>
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="MySaC" className="h-16 w-auto object-contain sm:h-20" />
          <CloudLoader />
        </div>
      </FluidParticlesBackground>
    </motion.div>
  )
}
