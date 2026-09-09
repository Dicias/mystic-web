import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../lib/whatsapp'

interface WhatsAppCTAProps {
  message: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'inverse'
}

const VARIANT_CLASSES: Record<NonNullable<WhatsAppCTAProps['variant']>, string> = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
  inverse: 'bg-white text-brand-red hover:bg-neutral-100',
}

export function WhatsAppCTA({ message, children, className = '', variant = 'primary' }: WhatsAppCTAProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <MessageCircle size={20} />
      {children}
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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}
