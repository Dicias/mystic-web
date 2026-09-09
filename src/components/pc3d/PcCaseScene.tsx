import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera, ContactShadows } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import { Rig } from './Rig'

interface PcCaseSceneProps {
  scrollYProgress: MotionValue<number>
}

function CameraAim() {
  const camera = useThree((state) => state.camera)
  useEffect(() => {
    camera.lookAt(0, 0.1, 0)
  }, [camera])
  return null
}

export function PcCaseScene({ scrollYProgress }: PcCaseSceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[3.6, 1.4, 5.2]} fov={34} />
      <CameraAim />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 3]} intensity={1.8} color="#ffffff" castShadow />
      <directionalLight position={[-3, 1.5, 2]} intensity={0.6} color="#dbe7ff" />
      <pointLight position={[0, 1.5, -3.5]} intensity={1.8} distance={9} color="#e0231c" />

      <Rig scrollYProgress={scrollYProgress} />

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.55}
        blur={2.6}
        far={3}
        scale={5}
      />
    </>
  )
}
