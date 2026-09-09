import { useEffect, useState } from 'react'

const MIN_WIDTH = 768

function computeShouldRender3D() {
  if (typeof window === 'undefined') return false
  const wideEnough = window.innerWidth >= MIN_WIDTH
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return wideEnough && !reducedMotion
}

export function useShouldRender3D() {
  const [shouldRender, setShouldRender] = useState(computeShouldRender3D)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setShouldRender(computeShouldRender3D())

    window.addEventListener('resize', update)
    mediaQuery.addEventListener('change', update)
    return () => {
      window.removeEventListener('resize', update)
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  return shouldRender
}
