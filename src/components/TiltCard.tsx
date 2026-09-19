import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

/** Pointer-driven 3D tilt for decorative (non-focusable) cards — grid tiles, value cards, etc. */
export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 300, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 300, damping: 22 })
  const scale = useSpring(1, { stiffness: 300, damping: 22 })

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => scale.set(1.02)}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
