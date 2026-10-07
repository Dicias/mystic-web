import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TESTIMONIALS } from '../data/testimonials'

const INTERVAL_MS = 6000

/** Editorial pull-quote rotator; the segmented bar doubles as progress and navigation. */
export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIndex((prev) => (prev + 1) % TESTIMONIALS.length), INTERVAL_MS)
    return () => clearTimeout(timer)
  }, [index])

  const current = TESTIMONIALS[index]

  return (
    <div>
      <div className="relative min-h-[16rem] sm:min-h-[14rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.id}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="text-balance font-serif text-3xl leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl">
              <span className="text-brand-red">“</span>
              {current.quote}
              <span className="text-brand-red">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-medium text-white">
                {current.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-medium text-white">{current.name}</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {current.role}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Ver testimonio ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="group relative h-11 flex-1 cursor-pointer"
          >
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden bg-white/15">
              {i === index && (
                <motion.span
                  key={`bar-${index}`}
                  className="absolute inset-y-0 left-0 bg-brand-red"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-white/40" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
