import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FanProps {
  radius?: number
  bladeColor?: string
  speed?: number
}

const BLADE_COUNT = 6

export const Fan = forwardRef<THREE.Group, FanProps>(function Fan(
  { radius = 0.3, bladeColor = '#e0231c', speed = 3.5 },
  ref,
) {
  const bladesRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    bladesRef.current.rotation.z += delta * speed
  })

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[radius, radius * 0.09, 10, 28]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.6} roughness={0.35} />
      </mesh>
      <group ref={bladesRef}>
        {Array.from({ length: BLADE_COUNT }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / BLADE_COUNT) * Math.PI * 2]}>
            <mesh position={[0, radius * 0.42, 0]}>
              <boxGeometry args={[radius * 0.16, radius * 0.75, 0.03]} />
              <meshStandardMaterial color={bladeColor} metalness={0.25} roughness={0.5} />
            </mesh>
          </group>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[radius * 0.14, radius * 0.14, 0.06, 16]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
})
