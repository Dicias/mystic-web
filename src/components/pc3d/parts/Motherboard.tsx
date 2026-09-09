import { forwardRef } from 'react'
import * as THREE from 'three'

export const Motherboard = forwardRef<THREE.Group>(function Motherboard(_props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.3, 2.0, 0.05]} />
        <meshStandardMaterial color="#0f1a16" metalness={0.15} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.15, 0.03]}>
        <boxGeometry args={[1.0, 0.05, 0.01]} />
        <meshStandardMaterial
          color="#e0231c"
          emissive="#e0231c"
          emissiveIntensity={0.25}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.0, 0.03]}>
        <boxGeometry args={[0.7, 0.05, 0.01]} />
        <meshStandardMaterial
          color="#ffd400"
          emissive="#ffd400"
          emissiveIntensity={0.2}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
})
