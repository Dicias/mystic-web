import { forwardRef } from 'react'
import * as THREE from 'three'

export const GlassPanel = forwardRef<THREE.Group>(function GlassPanel(_props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.75, 3.3, 0.04]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          transparent
          opacity={0.18}
          roughness={0.05}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-0.8, 0, 0.03]}>
        <boxGeometry args={[0.03, 3.2, 0.01]} />
        <meshStandardMaterial
          color="#e0231c"
          emissive="#e0231c"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
})
