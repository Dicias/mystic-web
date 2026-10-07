import { motion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'

interface PageHeaderProps {
  index: string
  eyebrow: string
  /** Plain part of the title. */
  title: string
  /** Serif-italic tail of the title, set in brand red. */
  accent?: string
  description?: string
  children?: React.ReactNode
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Editorial page opener shared by the inner pages: mono index, oversized title, intro copy. */
export function PageHeader({ index, eyebrow, title, accent, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      <div className="bg-hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-brand-red/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="text-balance mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl"
        >
          {title}
          {accent && (
            <>
              {' '}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-brand-red">
                {accent}
              </span>
            </>
          )}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400"
          >
            {description}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  )
}
