import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CHECKS = [
  'Disco duro',
  'Conexión de red',
  'Temperatura del CPU',
  'Respaldo de archivos',
  'Antivirus actualizado',
]

const STEP_MS = 650
const RESTART_DELAY_MS = 1800

export function DiagnosticPanel() {
  const [revealed, setRevealed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    function tick(step: number) {
      if (step > CHECKS.length) {
        timerRef.current = setTimeout(() => {
          setRevealed(0)
          tick(0)
        }, RESTART_DELAY_MS)
        return
      }
      setRevealed(step)
      timerRef.current = setTimeout(() => tick(step + 1), STEP_MS)
    }
    timerRef.current = setTimeout(() => tick(1), 500)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-mono shadow-2xl shadow-black/40 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-white/40">mysac_diagnostico.sh</span>
      </div>

      <ul className="space-y-2.5 text-sm">
        {CHECKS.map((label, i) => {
          const done = revealed > i
          return (
            <li key={label} className="flex items-center gap-2.5">
              <motion.span
                animate={{ scale: done ? 1 : 0, opacity: done ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-[10px] text-green-400"
              >
                ✓
              </motion.span>
              <motion.span
                animate={{ opacity: done ? 1 : 0.25 }}
                className="text-white/80"
              >
                {label}
                {done && <span className="text-white/35"> — OK</span>}
              </motion.span>
            </li>
          )
        })}
      </ul>

      <motion.div
        className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"
        aria-hidden="true"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-yellow"
          animate={{ width: `${(Math.min(revealed, CHECKS.length) / CHECKS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  )
}
