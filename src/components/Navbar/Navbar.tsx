import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#hero', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#timeline', label: 'journey' },
  { href: '#contact', label: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Detect scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detect active section via Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Close menu on nav click or Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(0,0,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <nav
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem clamp(1.25rem, 5vw, 4rem)',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Ashutosh Patra — Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.9rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
        >
          {'<'}
          <span
            style={{
              fontFamily: 'Agustina, cursive',
              fontSize: '1.5rem',
              color: '#F0F4FF',
              letterSpacing: '0.05em',
            }}
          >
            Ashutosh Patra
          </span>
          {'/>'}
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1)
            return (
              <a
                key={href}
                href={href}
                style={{
                  textDecoration: 'none',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.82rem',
                  letterSpacing: '0.05em',
                  color: isActive ? 'var(--blue)' : 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F0F4FF'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <span style={{ color: 'var(--blue)', marginRight: '0.2rem', opacity: 0.7 }}>//</span>
                {label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--blue)',
                      boxShadow: '0 0 6px rgba(0,212,255,0.6)',
                    }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* CTA Button */}
        <a
          href="mailto:ashutoshpatra616@gmail.com"
          className="btn-ghost hidden md:inline-flex"
          style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
        >
          <span>Hire Me</span>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="md:hidden"
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '20px',
                height: '1.5px',
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(4px, 4px)'
                    : menuOpen && i === 2
                    ? 'rotate(-45deg) translate(4px, -4px)'
                    : menuOpen && i === 1
                    ? 'scaleX(0)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,5,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          zIndex: 999,
          transition: 'opacity 0.3s ease, pointer-events 0.3s',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              textDecoration: 'none',
              fontFamily: "'Space Mono', monospace",
              fontSize: '1.4rem',
              color: activeSection === href.slice(1) ? 'var(--blue)' : 'var(--text-primary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
          >
            // {label}
          </a>
        ))}
        <a
          href="mailto:ashutoshpatra616@gmail.com"
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Hire Me
        </a>
      </div>
    </header>
  )
}
