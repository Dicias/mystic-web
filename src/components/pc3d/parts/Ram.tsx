import { forwardRef } from 'react'
import * as THREE from 'three'

interface RamProps {
  color?: string
}

export const Ram = forwardRef<THREE.Group, RamProps>(function Ram({ color = '#e0231c' }, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.08, 0.6, 0.35]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
})
