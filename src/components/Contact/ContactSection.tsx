import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [copied, setCopied] = useState(false)

  const EMAIL = 'ashutoshpatra616@gmail.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select text
    }
  }

  const SOCIALS = [
    {
      href: 'https://github.com/ashutoshpatraa',
      label: 'GitHub',
      color: '#F0F4FF',
    },
    {
      href: 'https://www.linkedin.com/in/ashutoshpatraa',
      label: 'LinkedIn',
      color: '#0A66C2',
    },
    {
      href: 'https://www.instagram.com/ashudoesnothinng',
      label: 'Instagram',
      color: '#E1306C',
    },
    {
      href: 'https://www.commudle.com/users/ashutoshpatra',
      label: 'Commudle',
      color: '#7C3AED',
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section"
      aria-labelledby="contact-title"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 60%),
          var(--black)
        `,
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '2.5rem',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--blue))',
              }}
            />
            Get In Touch
          </p>
          <h2 id="contact-title" className="section-title" style={{ textAlign: 'center' }}>
            Let's Build Something
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--blue), var(--purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Together ✦
            </span>
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            Whether you're looking for a{' '}
            <strong style={{ color: 'var(--text-primary)' }}>developer</strong>, want to{' '}
            <strong style={{ color: 'var(--text-primary)' }}>collaborate</strong> on an open source
            project, or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="glass-card"
          style={{
            padding: 'clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            background:
              'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(168,85,247,0.04) 100%)',
            borderColor: 'rgba(0,212,255,0.15)',
          }}
        >
          {/* Email display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Send email to ${EMAIL}`}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                border: '1px dashed rgba(255,255,255,0.15)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--blue)'
                el.style.color = 'var(--blue)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.15)'
                el.style.color = 'var(--text-primary)'
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {EMAIL}
            </a>

            {/* Copy button */}
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              style={{
                padding: '0.75rem 1.25rem',
                background: copied ? 'rgba(74,222,128,0.12)' : 'rgba(0,212,255,0.08)',
                border: `1px solid ${copied ? 'rgba(74,222,128,0.4)' : 'rgba(0,212,255,0.25)'}`,
                borderRadius: '8px',
                color: copied ? '#4ADE80' : 'var(--blue)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                letterSpacing: '0.04em',
              }}
            >
              {copied ? (
                <>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Primary CTA */}
          <a
            href={`mailto:${EMAIL}`}
            className="btn-primary"
            style={{ marginBottom: '2.5rem', fontSize: '1rem', padding: '1rem 2.5rem' }}
          >
            Say Hello 👋
          </a>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
            }}
            aria-hidden="true"
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
              }}
            >
              OR FIND ME ON
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Social links */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
            aria-label="Social media profiles"
          >
            {SOCIALS.map(({ href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${label} profile`}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = color + '66'
                  el.style.color = color
                  el.style.background = color + '10'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.color = 'var(--text-secondary)'
                  el.style.background = 'transparent'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
