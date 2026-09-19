import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from '../components/SectionReveal'
import { CircuitBackground } from '../components/CircuitBackground'
import { AmbientGlow } from '../components/AmbientGlow'
import { TiltCard } from '../components/TiltCard'
import {
  PORTFOLIO_CATEGORY_LABELS,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
} from '../data/portfolioItems'

type Filter = PortfolioCategory | 'todos'

const FILTERS: Filter[] = ['todos', 'armado', 'redes', 'cctv']

export function Portafolio() {
  const [filter, setFilter] = useState<Filter>('todos')

  const items =
    filter === 'todos' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((item) => item.category === filter)

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <AmbientGlow tone="light" />
      <CircuitBackground tone="light" className="opacity-40" />
      <div className="relative z-10">
      <SectionReveal className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-brand-black">Portafolio</h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Algunos de nuestros proyectos recientes (imágenes de ejemplo).
        </p>
      </SectionReveal>

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {FILTERS.map((f) => (
          <motion.button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              filter === f
                ? 'bg-brand-red text-white'
                : 'bg-neutral-100 text-brand-black hover:bg-neutral-200'
            }`}
          >
            {f === 'todos' ? 'Todos' : PORTFOLIO_CATEGORY_LABELS[f]}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <TiltCard className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
                  {PORTFOLIO_CATEGORY_LABELS[item.category]}
                </span>
                <h3 className="mt-1 font-bold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  )
}
