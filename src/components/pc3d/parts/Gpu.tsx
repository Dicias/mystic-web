import { forwardRef } from 'react'
import * as THREE from 'three'

export const Gpu = forwardRef<THREE.Group>(function Gpu(_props, ref) {
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.1, 0.3, 0.35]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.08, 0.18]}>
        <boxGeometry args={[0.95, 0.05, 0.02]} />
        <meshStandardMaterial
          color="#e0231c"
          emissive="#e0231c"
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0.42, -0.1, 0.18]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial
          color="#ffd400"
          emissive="#ffd400"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
})
