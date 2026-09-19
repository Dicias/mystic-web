import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId: number | null = null

/** Starts the app-wide smooth-scroll instance. Idempotent — safe to call from a StrictMode double effect. */
export function startLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return lenis
}

export function stopLenis() {
  if (rafId !== null) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
  rafId = null
}

/** The active Lenis instance, or null if smooth scroll hasn't started yet — used for programmatic scrollTo (e.g. anchor links) that must stay in sync with it instead of fighting it. */
export function getLenis() {
  return lenis
}
