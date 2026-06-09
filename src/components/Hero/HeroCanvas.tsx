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
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ─── Cyber Landscape (Interactive Grid) ──────────────────────────────────────
function CyberLandscape({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Custom geometry to create a fading edge grid
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 60, 60)
    // Add noise to vertices to make it look like a terrain
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      // distance from center
      const dist = Math.sqrt(x*x + y*y)
      // wave math
      const z = Math.sin(dist * 0.5) * 0.5 + Math.cos(x * 0.5) * 0.2
      pos.setZ(i, z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.elapsedTime
      
      // Subtle hovering
      meshRef.current.position.y = -3 + Math.sin(time * 0.4) * 0.2
      
      // Move the terrain to simulate forward movement
      const pos = meshRef.current.geometry.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const dist = Math.sqrt(x*x + y*y)
        const z = Math.sin(dist * 0.5 - time * 2) * 0.5 + Math.cos(x * 0.5 + time) * 0.2
        pos.setZ(i, z)
      }
      pos.needsUpdate = true
      
      // Mouse Parallax
      meshRef.current.rotation.y = mouseX * 0.1
      meshRef.current.rotation.x = -Math.PI / 2 + Math.sin(time * 0.2) * 0.05 + mouseY * 0.05
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <meshBasicMaterial 
        color="#A855F7" 
        wireframe 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ─── Scene Root ─────────────────────────────────────────────────────────────
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
      <CyberLandscape mouseX={mouseX} mouseY={mouseY} />
      
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
