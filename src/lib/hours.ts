import { useEffect, useState } from 'react'

// Business hours in Querétaro time, regardless of the visitor's own timezone.
// Mirrors BUSINESS.hours ("Lunes a Viernes: 9:00 am – 6:00 pm").
const TIMEZONE = 'America/Mexico_City'
const OPEN_DAYS = new Set(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
const OPEN_HOUR = 9
const CLOSE_HOUR = 18

export function isOpenAt(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const day = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? -1)
  return OPEN_DAYS.has(day) && hour >= OPEN_HOUR && hour < CLOSE_HOUR
}

/** Re-checks every minute so a tab left open flips at opening/closing time. */
export function useIsOpen() {
  const [open, setOpen] = useState(() => isOpenAt(new Date()))
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenAt(new Date())), 60_000)
    return () => clearInterval(id)
  }, [])
  return open
}
