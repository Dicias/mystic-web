import { motion } from 'framer-motion'
import type { Service } from '../data/services'

interface ServiceCardProps {
  service: Service
  onSelect?: (service: Service) => void
}

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -6 },
}

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 12, scale: 1.1 },
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const Icon = service.icon
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(service)}
      className="flex h-full flex-col items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-xl"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red"
        variants={iconVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
      >
        <Icon size={26} />
      </motion.div>
      <h3 className="text-lg font-bold text-brand-black">{service.title}</h3>
      <p className="text-sm text-neutral-600">{service.shortDescription}</p>
    </motion.button>
  )
}
