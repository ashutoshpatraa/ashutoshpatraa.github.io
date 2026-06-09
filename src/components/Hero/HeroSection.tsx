import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'
import { usePerformanceTier } from '../../hooks/usePerformanceTier'
import Magnetic from '../ui/Magnetic'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const ROLES = [
  'Student Coder',
  'Still Learning',
  'Python Hobbyist',
  'Web Tinkerer',
  'Open Source Newbie',
  'Building Things for Fun',
]

const MotionDiv = motion.div
const MotionSpan = motion.span
const MotionH1 = motion.h1

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  const { normalizedPos } = useMousePosition()
  const { canUse3D, particleCount } = usePerformanceTier()
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIdx]
    if (typing) {
      if (displayed.length < target.length) {
        typeRef.current = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1))
        }, 60)
      } else {
        typeRef.current = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        typeRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 30)
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
    return () => { if (typeRef.current) clearTimeout(typeRef.current) }
  }, [displayed, typing, roleIdx])

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,255,0.07) 0%, transparent 60%)',
      }}
    >
      {/* 3D Canvas (desktop) or CSS fallback (mobile) */}
      {canUse3D ? (
        <Suspense fallback={null}>
          <HeroCanvas
            mouseX={normalizedPos.x}
            mouseY={normalizedPos.y}
            particleCount={particleCount}
          />
        </Suspense>
      ) : (
        /* CSS particle fallback for mobile */
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,212,255,0.08) 0%, transparent 50%)',
          }}
        />
      )}

      {/* Gradient overlays for readability */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(0,0,5,0.85) 0%, rgba(0,0,5,0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, var(--black) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '6rem',
          paddingBottom: '4rem',
        }}
      >
        <MotionDiv
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          style={{ maxWidth: '720px' }}
        >
          {/* Greeting */}
          <MotionDiv variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                color: 'var(--blue)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '2.5rem',
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--blue), transparent)',
                }}
              />
              Namasté, I'm
            </span>
          </MotionDiv>

          {/* Name */}
          <MotionH1
            id="hero-title"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(240,244,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ASHUTOSH
            <br />
            PATRA
          </MotionH1>

          {/* Typewriter role */}
          <MotionDiv
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '1.75rem' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight: 400,
                color: 'var(--text-secondary)',
              }}
            >
              {'> '}
              <MotionSpan
                style={{
                  color: 'var(--blue)',
                  fontWeight: 600,
                }}
              >
                {displayed}
              </MotionSpan>
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.2em',
                  background: 'var(--blue)',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
                aria-hidden="true"
              />
            </span>
          </MotionDiv>

          {/* Bio */}
          <MotionDiv
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '2.5rem' }}
          >
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: '540px',
              }}
            >
              18-year-old from{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>India</span>{' '}
              who started coding for fun and never stopped. I know the{' '}
              <span style={{ color: 'var(--blue)' }}>basics</span> and I'm learning more every day —
              mostly by{' '}
              <span style={{ color: 'var(--purple)' }}>breaking things</span> and figuring out why.
            </p>
          </MotionDiv>

          {/* CTA Buttons */}
          <MotionDiv
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            <Magnetic intensity={0.4}>
              <a href="#projects" className="btn-primary">
                View Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic intensity={0.4}>
              <a href="#contact" className="btn-ghost">
                Get In Touch
              </a>
            </Magnetic>
          </MotionDiv>

          {/* Social Links */}
          <MotionDiv
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
            aria-label="Social media links"
          >
            {[
              {
                href: 'https://github.com/ashutoshpatraa',
                label: 'GitHub',
                icon: (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: 'https://www.linkedin.com/in/ashutoshpatraa',
                label: 'LinkedIn',
                icon: (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                href: 'https://www.instagram.com/ashudoesnothinng',
                label: 'Instagram',
                icon: (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ),
              },
              {
                href: 'mailto:ashutoshpatra616@gmail.com',
                label: 'Email',
                icon: (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map(({ href, label, icon }) => (
              <Magnetic key={label} intensity={0.25}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  style={{
                    color: 'var(--text-muted)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--blue)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--text-muted)'
                  }}
                >
                  {icon}
                </a>
              </Magnetic>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--blue), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
