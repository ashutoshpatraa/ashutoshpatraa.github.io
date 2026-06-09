import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STAT_BARS } from '../../data/skills'

const ACHIEVEMENTS = [
  { icon: '🌐', title: 'Open Source', desc: 'Active contributor', color: '#00D4FF' },
  { icon: '🤖', title: 'ML Explorer', desc: 'TF + scikit-learn', color: '#A855F7' },
  { icon: '🫐', title: '3D Modeler', desc: 'Blender enthusiast', color: '#22D3EE' },
  { icon: '🏆', title: 'Hackathons', desc: 'Built & shipped fast', color: '#4ADE80' },
]

const RPG_STATS = [
  { label: 'NAME', value: 'Ashutosh Patra', mono: false },
  { label: 'ALIAS', value: 'ashutoshpatraa', mono: true },
  { label: 'CLASS', value: 'Student / Learner', mono: false },
  { label: 'LEVEL', value: '18', mono: true },
  { label: 'ORIGIN', value: 'India 🇮🇳', mono: false },
  { label: 'STATUS', value: '● Learning Every Day', mono: false, color: '#4ADE80' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 100% 50%, rgba(168,85,247,0.05) 0%, transparent 60%),
          var(--black)
        `,
      }}
      aria-labelledby="about-title"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">About Me</p>
          <h2 id="about-title" className="section-title">
            Character Profile
          </h2>
          <p className="section-subtitle">
            Every developer has a story. Here's mine — told in RPG stats and honest words.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(260px, 30%, 340px) 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
          className="xl:grid-cols-[340px_1fr] flex flex-col xl:grid"
        >
          {/* ── Left: Profile photo + status ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div
              className="glass-card"
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              {/* Photo with hex-inspired frame */}
              <div
                style={{
                  position: 'relative',
                  width: '160px',
                  height: '160px',
                  margin: '0 auto 1.5rem',
                }}
              >
                {/* Spinning rings */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0,212,255,0.3)',
                    animation: 'spin-slow 8s linear infinite',
                    borderTopColor: 'var(--blue)',
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: '-22px',
                    borderRadius: '50%',
                    border: '1px dashed rgba(168,85,247,0.2)',
                    animation: 'spin-slow 14s linear infinite reverse',
                  }}
                />

                <img
                  src="./profile.jpg"
                  alt="Ashutosh Patra — developer from India"
                  width={160}
                  height={160}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid rgba(0,212,255,0.4)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                }}
              >
                Ashutosh Patra
              </h3>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                @ashutoshpatraa
              </p>

              {/* Status badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.25)',
                  borderRadius: '99px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.8rem',
                  color: '#4ADE80',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#4ADE80',
                    boxShadow: '0 0 6px rgba(74,222,128,0.8)',
                    animation: 'status-pulse 2s ease infinite',
                    flexShrink: 0,
                  }}
                />
                Learning Every Day
              </div>

              {/* Mini social */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginTop: '1.5rem',
                }}
              >
                {[
                  { href: 'https://github.com/ashutoshpatraa', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/ashutoshpatraa', label: 'LinkedIn' },
                  { href: 'https://www.instagram.com/ashudoesnothinng', label: 'Instagram' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: "'Space Mono', monospace",
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: RPG Stats + XP bars ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Character Sheet */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="glass-card"
              style={{ padding: '1.75rem' }}
            >
              {/* Terminal header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => (
                    <span
                      key={c}
                      style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginLeft: '0.5rem',
                  }}
                >
                  character_profile.json
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.85rem 2rem',
                }}
              >
                {RPG_STATS.map(({ label, value, mono, color }) => (
                  <div key={label}>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: mono ? "'Space Mono', monospace" : 'var(--font-heading)',
                        fontSize: mono ? '0.85rem' : '0.95rem',
                        color: color || 'var(--text-primary)',
                        fontWeight: mono ? 400 : 600,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Attribute Bars */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="glass-card"
              style={{ padding: '1.75rem' }}
            >
              <h3
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'var(--blue)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                // Attributes
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {STAT_BARS.map(({ label, value, color }, i) => (
                  <div key={label}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.75rem',
                          color,
                        }}
                      >
                        {value}
                      </span>
                    </div>
                    <div className="xp-bar">
                      <motion.div
                        className="xp-bar-fill"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 8px ${color}66` }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${value}%` } : { width: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Achievement Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          {ACHIEVEMENTS.map(({ icon, title, desc, color }) => (
            <div
              key={title}
              className="glass-card"
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'default',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = color + '55'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'var(--glass-border)'
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  lineHeight: 1,
                  filter: 'saturate(1.2)',
                }}
                aria-hidden="true"
              >
                {icon}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.1rem',
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
