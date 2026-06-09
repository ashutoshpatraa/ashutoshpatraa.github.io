import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─── Particle Field ────────────────────────────────────────────────────────────
interface ParticleFieldProps {
  count: number
  mouseX: number
  mouseY: number
}

function ParticleField({ count, mouseX, mouseY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 12 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.04
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1
      // Mouse parallax
      pointsRef.current.rotation.y += mouseX * 0.03
      pointsRef.current.rotation.x += mouseY * 0.01
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  )
}

// ─── Floating Wireframe Shapes ─────────────────────────────────────────────────
function FloatingShape({
  position,
  geometry,
  color,
  speed = 0.4,
  delay = 0,
  scale = 1,
}: {
  position: [number, number, number]
  geometry: 'icosahedron' | 'torus' | 'octahedron'
  color: string
  speed?: number
  delay?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.elapsedTime + delay
      meshRef.current.rotation.x = t * speed * 0.7
      meshRef.current.rotation.y = t * speed
      meshRef.current.rotation.z = t * speed * 0.3
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.3, 8, 20]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color={color} wireframe opacity={0.35} transparent />
    </mesh>
  )
}

// ─── Scene Root (handles mouse parallax for entire scene) ─────────────────────
function Scene({ particleCount, mouseX, mouseY }: { particleCount: number; mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.08 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-mouseY * 0.05 - groupRef.current.rotation.x) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <ParticleField count={particleCount} mouseX={mouseX} mouseY={mouseY} />

      {/* Icosahedron — left, blue */}
      <FloatingShape
        position={[-4, 0.5, -3]}
        geometry="icosahedron"
        color="#00D4FF"
        speed={0.3}
        scale={1.2}
      />

      {/* Torus — right, purple */}
      <FloatingShape
        position={[4.5, -0.5, -4]}
        geometry="torus"
        color="#A855F7"
        speed={0.25}
        delay={2}
        scale={1.1}
      />

      {/* Octahedron — center-right, cyan */}
      <FloatingShape
        position={[2, 2.5, -5]}
        geometry="octahedron"
        color="#22D3EE"
        speed={0.35}
        delay={1}
        scale={0.8}
      />

      {/* Small icosahedron — bottom left */}
      <FloatingShape
        position={[-3, -2.5, -3]}
        geometry="icosahedron"
        color="#A855F7"
        speed={0.5}
        delay={3}
        scale={0.5}
      />

      {/* Lights */}
      <ambientLight intensity={0.1} />
      <pointLight position={[-5, 5, 5]} color="#00D4FF" intensity={2} />
      <pointLight position={[5, -5, 3]} color="#A855F7" intensity={1.5} />
    </group>
  )
}

// ─── Canvas Export ─────────────────────────────────────────────────────────────
interface HeroCanvasProps {
  mouseX: number
  mouseY: number
  particleCount: number
}

export default function HeroCanvas({ mouseX, mouseY, particleCount }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    >
      <Scene particleCount={particleCount} mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
