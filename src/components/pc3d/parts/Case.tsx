import { forwardRef } from 'react'
import * as THREE from 'three'

const WIDTH = 1.8
const HEIGHT = 3.4
const DEPTH = 1.1
const WALL = 0.07

export const Case = forwardRef<THREE.Group>(function Case(_props, ref) {
  return (
    <group ref={ref}>
      {/* Back panel */}
      <mesh position={[0, 0, -DEPTH / 2 + WALL / 2]}>
        <boxGeometry args={[WIDTH, HEIGHT, WALL]} />
        <meshStandardMaterial color="#2b2b2e" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Left panel */}
      <mesh position={[-WIDTH / 2 + WALL / 2, 0, 0]}>
        <boxGeometry args={[WALL, HEIGHT, DEPTH]} />
        <meshStandardMaterial color="#2b2b2e" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Right panel */}
      <mesh position={[WIDTH / 2 - WALL / 2, 0, 0]}>
        <boxGeometry args={[WALL, HEIGHT, DEPTH]} />
        <meshStandardMaterial color="#333336" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Top panel */}
      <mesh position={[0, HEIGHT / 2 - WALL / 2, 0]}>
        <boxGeometry args={[WIDTH, WALL, DEPTH]} />
        <meshStandardMaterial color="#333336" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Bottom panel */}
      <mesh position={[0, -HEIGHT / 2 + WALL / 2, 0]}>
        <boxGeometry args={[WIDTH, WALL, DEPTH]} />
        <meshStandardMaterial color="#333336" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  )
})
