import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  // Use useMemo to avoid recreating geometry every render
  const wireGeometry = useMemo(() => new THREE.IcosahedronGeometry(2.2, 2), [])
  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(2.1, 2), [])

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime
      groupRef.current.rotation.y = t * 0.15 + pointer.x * 0.5
      groupRef.current.rotation.x = pointer.y * 0.5 + Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* The glowing wireframe shell */}
      <mesh geometry={wireGeometry}>
        <meshBasicMaterial 
          color="#00D4FF" 
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid black core to hide backfacing wireframes and give depth */}
      <mesh ref={coreRef} geometry={coreGeometry}>
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Orbiting particles */}
      <OrbitingRing count={40} radius={3.5} speed={0.5} />
      <OrbitingRing count={30} radius={4.2} speed={-0.3} tilt={Math.PI / 4} />
    </group>
  )
}

function OrbitingRing({ count, radius, speed, tilt = 0 }: { count: number, radius: number, speed: number, tilt?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      arr[i * 3] = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5 // slight vertical variation
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [count, radius])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * speed
      ref.current.rotation.x = tilt
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00D4FF" size={0.05} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function Github3DGlobe() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <WireframeGlobe />
      </Canvas>
    </div>
  )
}
