import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Service } from '../data/services'

interface ServiceCardProps {
  service: Service
  onSelect?: (service: Service) => void
}

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 12, scale: 1.1 },
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const Icon = service.icon
  const ref = useRef<HTMLButtonElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 300, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  function handleMove(e: PointerEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect?.(service)}
      onPointerMove={handleMove}
      onPointerEnter={() => y.set(-6)}
      onPointerLeave={handleLeave}
      className="flex h-full flex-col items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-xl"
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ rotateX, rotateY, y, transformPerspective: 800 }}
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
