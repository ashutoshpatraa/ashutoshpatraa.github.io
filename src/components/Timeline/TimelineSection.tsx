import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIMELINE } from '../../data/timeline'

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section"
      aria-labelledby="timeline-title"
      style={{
        background: `
          radial-gradient(ellipse 50% 80% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 60%),
          var(--surface-0)
        `,
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">My Journey</p>
          <h2 id="timeline-title" className="section-title">
            The Story So Far
          </h2>
          <p className="section-subtitle">
            From Roblox scripts to React apps — every year a new level unlocked.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Center vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, var(--blue), var(--purple), transparent)',
              transformOrigin: 'top',
              transform: 'translateX(-50%)',
            }}
            aria-hidden="true"
          />

          {TIMELINE.map((event, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.12 }}
                style={{
                  display: 'flex',
                  flexDirection: isLeft ? 'row' : 'row-reverse',
                  gap: 0,
                  marginBottom: '2.5rem',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
                aria-label={`${event.year}: ${event.title}`}
              >
                {/* Content card */}
                <div
                  style={{
                    width: 'calc(50% - 2rem)',
                    ...(isLeft ? { paddingRight: '1.5rem' } : { paddingLeft: '1.5rem' }),
                  }}
                >
                  <div
                    className="glass-card"
                    style={{
                      padding: '1.5rem',
                      borderColor: event.highlight ? 'rgba(0,212,255,0.2)' : 'var(--glass-border)',
                      boxShadow: event.highlight
                        ? 'var(--glass-shadow), 0 0 20px rgba(0,212,255,0.05)'
                        : 'var(--glass-shadow)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(0,212,255,0.35)'
                      el.style.transform = isLeft ? 'translateX(-4px)' : 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = event.highlight
                        ? 'rgba(0,212,255,0.2)'
                        : 'var(--glass-border)'
                      el.style.transform = 'translateX(0)'
                    }}
                  >
                    {/* Year badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '4px',
                        background: event.highlight ? 'var(--blue-dim)' : 'rgba(255,255,255,0.04)',
                        border: event.highlight ? '1px solid rgba(0,212,255,0.25)' : '1px solid var(--border)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.7rem',
                        color: event.highlight ? 'var(--blue)' : 'var(--text-muted)',
                        marginBottom: '0.75rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      <span aria-hidden="true">{event.icon}</span>
                      {event.year}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.6rem',
                      }}
                    >
                      {event.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                        marginBottom: '1rem',
                      }}
                    >
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {event.tags.map((tag) => (
                        <span key={tag} className="tech-tag" style={{ fontSize: '0.65rem' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1.5rem',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                  }}
                  aria-hidden="true"
                >
                  {/* Pulse ring */}
                  {event.highlight && (
                    <div
                      style={{
                        position: 'absolute',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0,212,255,0.4)',
                        animation: 'pulse-ring 2s ease-in-out infinite',
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: event.highlight
                        ? 'var(--blue)'
                        : 'rgba(255,255,255,0.15)',
                      border: `2px solid ${event.highlight ? 'var(--blue)' : 'var(--border)'}`,
                      boxShadow: event.highlight ? '0 0 12px rgba(0,212,255,0.7)' : 'none',
                    }}
                  />
                </div>

                {/* Empty opposite side */}
                <div style={{ width: 'calc(50% - 2rem)' }} />
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: linear timeline */}
        <style>{`
          @media (max-width: 640px) {
            .timeline-line { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
