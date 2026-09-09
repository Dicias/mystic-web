import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = TESTIMONIALS[index]

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Quote className="mx-auto mb-4 text-brand-red" size={36} />
      <div className="relative min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg italic text-neutral-700">“{current.quote}”</p>
            <p className="mt-4 font-semibold text-brand-black">{current.name}</p>
            <p className="text-sm text-neutral-500">{current.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Ver testimonio ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? 'bg-brand-red' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
