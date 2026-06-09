import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoadingScreenProps {
  onComplete: () => void
}

const BOOT_LINES = [
  '> INITIALIZING PORTFOLIO v2.0...',
  '> LOADING SYSTEM MODULES [████████░░] 80%',
  '> MOUNTING 3D ENGINE................OK',
  '> CALIBRATING NEURAL INTERFACE.....OK',
  '> LOADING SYSTEM MODULES [██████████] 100%',
  '',
  '> WELCOME, VISITOR.',
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    // Only play loading animation once per session
    if (hasRun.current) {
      onComplete()
      return
    }
    const seen = sessionStorage.getItem('portfolio-loaded')
    if (seen) {
      onComplete()
      return
    }
    hasRun.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('portfolio-loaded', 'true')
        // Fade out
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: onComplete,
        })
      },
    })

    // Animate each boot line appearing
    linesRef.current.forEach((line, i) => {
      if (line) {
        tl.to(
          line,
          { opacity: 1, duration: 0.01 },
          i * 0.18
        )
      }
    })

    // Progress bar
    tl.to(
      progressRef.current,
      { width: '100%', duration: 1.2, ease: 'power2.out' },
      0
    )

    // Hold for a moment after boot
    tl.to({}, { duration: 0.4 })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000005',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Mono', monospace",
        padding: '2rem',
      }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Logo */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'Agustina, cursive',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#F0F4FF',
            letterSpacing: '0.05em',
          }}
        >
          AP
        </span>
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
            marginTop: '0.5rem',
          }}
        />
      </div>

      {/* Boot sequence terminal */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(0, 212, 255, 0.03)',
          border: '1px solid rgba(0, 212, 255, 0.15)',
          borderRadius: '8px',
          padding: '1.5rem',
        }}
      >
        {BOOT_LINES.map((line, i) => (
          <p
            key={i}
            ref={(el) => { linesRef.current[i] = el }}
            style={{
              opacity: 0,
              fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
              color: line.includes('WELCOME') ? '#00D4FF' : line === '' ? undefined : '#6B7A99',
              marginBottom: line === '' ? '0.5rem' : '0.4rem',
              letterSpacing: '0.05em',
              minHeight: '1em',
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '99px',
          marginTop: '1.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: '0%',
            height: '100%',
            background: 'linear-gradient(90deg, #00D4FF, #A855F7)',
            borderRadius: '99px',
            boxShadow: '0 0 10px rgba(0,212,255,0.6)',
          }}
        />
      </div>
    </div>
  )
}
