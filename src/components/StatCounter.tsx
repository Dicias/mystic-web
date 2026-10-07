import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
}

export function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <div ref={ref}>
      <p className="text-4xl font-semibold tabular-nums tracking-[-0.04em] text-white sm:text-5xl">
        {displayValue.toLocaleString('es-MX')}
        <span className="text-brand-red">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">{label}</p>
    </div>
  )
}
