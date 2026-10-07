import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../lib/whatsapp'

interface WhatsAppCTAProps {
  message: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'inverse' | 'ghost'
}

const VARIANT_CLASSES: Record<NonNullable<WhatsAppCTAProps['variant']>, string> = {
  primary:
    'bg-brand-red text-white shadow-[0_10px_40px_-10px_rgba(224,35,28,0.7)] hover:bg-brand-red-dark',
  inverse: 'bg-white text-neutral-950 hover:bg-neutral-200',
  ghost: 'border border-white/15 bg-white/[0.03] text-white backdrop-blur hover:bg-white/10',
}

export function WhatsAppCTA({ message, children, className = '', variant = 'primary' }: WhatsAppCTAProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-[15px] font-medium transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <MessageCircle size={18} />
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}

export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppLink('Hola MySaC, me gustaría más información.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] ring-1 ring-white/20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}
