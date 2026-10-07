import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { type WorksWheelItem } from '@/components/ui/works-wheel'
import { ScrollWorksWheel } from '../components/ScrollWorksWheel'
import { PageHeader } from '../components/PageHeader'
import { FinalCTA } from '../components/FinalCTA'
import { Eyebrow } from '../components/Eyebrow'
import { SectionReveal } from '../components/SectionReveal'
import {
  PORTFOLIO_CATEGORY_LABELS,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
} from '../data/portfolioItems'

type Filter = PortfolioCategory | 'todos'

const FILTERS: Filter[] = ['todos', 'armado', 'redes', 'cctv']

const WHEEL_ITEMS: WorksWheelItem[] = PORTFOLIO_ITEMS.map((item) => ({
  title: item.title,
  image: item.image,
}))

export function Portafolio() {
  const [filter, setFilter] = useState<Filter>('todos')

  const items =
    filter === 'todos' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((item) => item.category === filter)

  return (
    <div>
      <PageHeader
        index="02"
        eyebrow="Portafolio"
        title="Proyectos que"
        accent="hablan"
        description="Armados, redes y videovigilancia para hogares y negocios de Querétaro. Sigue bajando para recorrerlos en la rueda."
      />
      <ScrollWorksWheel items={WHEEL_ITEMS} label="Proyectos '26" />

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <SectionReveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow index="—">Índice</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Todos los{' '}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-brand-red">proyectos</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative min-h-10 cursor-pointer rounded-xl px-4 text-sm transition-colors ${
                  filter === f ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-xl bg-brand-red"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f === 'todos' ? 'Todos' : PORTFOLIO_CATEGORY_LABELS[f]}</span>
              </button>
            ))}
          </div>
        </SectionReveal>

        <motion.div layout className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-[29/20] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red">
                    {PORTFOLIO_CATEGORY_LABELS[item.category]}
                  </span>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <FinalCTA />
    </div>
  )
}
