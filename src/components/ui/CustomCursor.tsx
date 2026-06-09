import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on mouse devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId = 0
    let isHovering = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
    }

    const onMouseEnter = () => {
      isHovering = true
      if (ringRef.current) {
        ringRef.current.style.width = '60px'
        ringRef.current.style.height = '60px'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.8)'
        ringRef.current.style.backgroundColor = 'rgba(0,212,255,0.05)'
      }
    }

    const onMouseLeave = () => {
      isHovering = false
      if (ringRef.current) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.borderColor = 'rgba(0,212,255,0.4)'
        ringRef.current.style.backgroundColor = 'transparent'
      }
    }

    const animate = () => {
      // Lerp for smooth ring lag
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
        // Scale up slightly when hovering interactive elements
        ringRef.current.style.opacity = isHovering ? '0.9' : '0.6'
      }
      rafId = requestAnimationFrame(animate)
    }

    // Attach to all interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, .project-card, .skill-node')
        .forEach((el) => {
          el.addEventListener('mouseenter', onMouseEnter)
          el.addEventListener('mouseleave', onMouseLeave)
        })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)
    addHoverListeners()

    // Re-scan for new interactive elements after a short delay
    setTimeout(addHoverListeners, 1500)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#00D4FF',
          boxShadow: '0 0 8px rgba(0,212,255,0.8)',
          pointerEvents: 'none',
          zIndex: 10000,
          marginLeft: '-3px',
          marginTop: '-3px',
          willChange: 'transform',
          transition: 'opacity 0.3s',
        }}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(0,212,255,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-18px',
          marginTop: '-18px',
          willChange: 'transform',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
        }}
      />
    </>
  )
}
