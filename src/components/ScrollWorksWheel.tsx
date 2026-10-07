import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel'
import { cn } from '@/lib/utils'
import { getLenis } from '../lib/lenis'

interface ScrollWorksWheelProps {
  items: WorksWheelItem[]
  label: string
  className?: string
  /** Scroll distance per item, in viewport heights. */
  stepVh?: number
}

/** Fraction of each step the wheel holds still on an item before moving on. */
const HOLD = 0.28

/** Maps raw progress onto steps with flat landings, so every item rests front
    and centre for a moment instead of the drum always sitting between two. */
function plateau(x: number) {
  const n = Math.floor(x)
  const f = x - n
  if (f <= HOLD) return n
  if (f >= 1 - HOLD) return n + 1
  const k = (f - HOLD) / (1 - 2 * HOLD)
  return n + k * k * (3 - 2 * k)
}

/**
 * Pins the WorksWheel to the viewport and turns it with page scroll. The wheel
 * only starts moving once it is pinned — fully in view — so nothing turns while
 * it is half off screen, and the page never stops scrolling under the reader
 * (mouse, trackpad and touch all work the same way).
 */
export function ScrollWorksWheel({ items, label, className, stepVh = 60 }: ScrollWorksWheelProps) {
  const runwayRef = useRef<HTMLDivElement>(null)
  const steps = items.length // ring → item 0 is one step, then one per remaining item

  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ['start start', 'end end'] })
  const turn = useTransform(scrollYProgress, (p) => plateau(p * steps))

  // Index / arrow-key picks scroll the page to the point where that item is in front.
  function select(index: number) {
    const runway = runwayRef.current
    if (!runway) return
    const travel = runway.offsetHeight - window.innerHeight
    const top = runway.getBoundingClientRect().top + window.scrollY
    const y = top + ((index + 1) / steps) * travel
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { duration: 1.2 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div ref={runwayRef} className="relative" style={{ height: `calc(100svh + ${steps * stepVh}vh)` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <WorksWheel
          items={items}
          label={label}
          turn={turn}
          onPick={select}
          className={cn('h-full bg-transparent font-semibold tracking-[-0.04em] [&_ol]:top-24', className)}
        />
      </div>
    </div>
  )
}
