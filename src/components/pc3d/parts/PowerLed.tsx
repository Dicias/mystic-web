import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const PowerLed = forwardRef<THREE.Group>(function PowerLed(_props, ref) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const pulse = 0.9 + Math.sin(clock.elapsedTime * 3.2) * 0.5
    materialRef.current.emissiveIntensity = pulse
    lightRef.current.intensity = pulse * 0.8
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ffd400"
          emissive="#ffd400"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={lightRef} color="#ffd400" intensity={1} distance={2} />
    </group>
  )
})
