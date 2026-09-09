import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { QuadraticBezierLine } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { Case } from './parts/Case'
import { Motherboard } from './parts/Motherboard'
import { Ram } from './parts/Ram'
import { Gpu } from './parts/Gpu'
import { Fan } from './parts/Fan'
import { GlassPanel } from './parts/GlassPanel'
import { PowerLed } from './parts/PowerLed'

interface RigProps {
  scrollYProgress: MotionValue<number>
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

function applyEntrance(
  obj: THREE.Object3D | null,
  progress: number,
  start: number,
  end: number,
  targetX: number,
  targetY: number,
  targetZ: number,
  offsetX: number,
  offsetY: number,
  offsetZ: number,
) {
  if (!obj) return
  const t = smoothstep(clamp01((progress - start) / (end - start)))
  obj.position.set(
    targetX + offsetX * (1 - t),
    targetY + offsetY * (1 - t),
    targetZ + offsetZ * (1 - t),
  )
  obj.scale.setScalar(0.001 + 0.999 * t)
}

export function Rig({ scrollYProgress }: RigProps) {
  const caseRef = useRef<THREE.Group>(null)
  const boardRef = useRef<THREE.Group>(null)
  const cpuRef = useRef<THREE.Group>(null)
  const ram1Ref = useRef<THREE.Group>(null)
  const ram2Ref = useRef<THREE.Group>(null)
  const gpuRef = useRef<THREE.Group>(null)
  const cableRef = useRef<THREE.Group>(null)
  const fan1Ref = useRef<THREE.Group>(null)
  const fan2Ref = useRef<THREE.Group>(null)
  const panelRef = useRef<THREE.Group>(null)
  const ledRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const p = scrollYProgress.get()

    applyEntrance(caseRef.current, p, 0, 0.1, 0, 0, 0, 0, 1.5, 0)
    applyEntrance(boardRef.current, p, 0.08, 0.2, 0, 0.3, -0.35, -2.2, 0, 0)
    applyEntrance(cpuRef.current, p, 0.18, 0.3, -0.25, 0.85, -0.3, 0, 1.8, 0)
    applyEntrance(ram1Ref.current, p, 0.26, 0.36, 0.25, 0.75, -0.32, 0, 1.8, 0)
    applyEntrance(ram2Ref.current, p, 0.3, 0.4, 0.38, 0.75, -0.32, 0, 1.8, 0)
    applyEntrance(gpuRef.current, p, 0.38, 0.5, 0, -0.35, -0.25, 2.2, 0, 0)
    applyEntrance(cableRef.current, p, 0.48, 0.58, 0, 0, 0, 0, 0, 0)
    applyEntrance(fan1Ref.current, p, 0.56, 0.66, -0.35, -1.25, 0.5, 0, 0, 1.5)
    applyEntrance(fan2Ref.current, p, 0.6, 0.7, 0.35, -1.25, 0.5, 0, 0, 1.5)
    applyEntrance(panelRef.current, p, 0.68, 0.85, 0, 0, 0.62, 2.5, 0, 0)
    applyEntrance(ledRef.current, p, 0.82, 0.94, 0, 1.55, 0.6, 0, 0, 0)
  })

  return (
    <group>
      <Case ref={caseRef} />
      <Motherboard ref={boardRef} />
      <Fan ref={cpuRef} radius={0.26} />
      <Ram ref={ram1Ref} color="#e0231c" />
      <Ram ref={ram2Ref} color="#ffd400" />
      <Gpu ref={gpuRef} />
      <group ref={cableRef}>
        <QuadraticBezierLine
          start={[0.5, -0.3, -0.1]}
          end={[0.5, -1.4, 0.2]}
          mid={[0.75, -0.85, 0.3]}
          color="#ffd400"
          lineWidth={3}
        />
      </group>
      <Fan ref={fan1Ref} radius={0.26} />
      <Fan ref={fan2Ref} radius={0.26} />
      <GlassPanel ref={panelRef} />
      <PowerLed ref={ledRef} />
    </group>
  )
}
