import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FEATURED_PROJECTS, OTHER_PROJECTS, type Project } from '../../data/projects'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? 'rgba(0,212,255,0.3)' : 'var(--glass-border)'}`,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: hovered
            ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.1)'
            : 'var(--glass-shadow)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Mission status badge */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 2,
          padding: '0.25rem 0.65rem',
          borderRadius: '4px',
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.25)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem',
          color: 'var(--blue)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
        aria-hidden="true"
      >
        ● MISSION AVAILABLE
      </div>

      {/* Project banner */}
      <div
        style={{
          height: '140px',
          background: project.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            transition: 'opacity 0.4s',
            opacity: hovered ? 1 : 0.5,
          }}
        />

        {/* Shimmer on hover */}
        {hovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        )}

        <span
          style={{
            fontSize: '3.5rem',
            lineHeight: 1,
            filter: `drop-shadow(0 0 20px rgba(0,0,0,0.8))`,
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.12) translateY(-4px)' : 'scale(1)',
            position: 'relative',
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          {project.emoji}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title + Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.75rem',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'var(--text-primary)',
            }}
          >
            {project.title}
          </h3>
          <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              style={{
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Year */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
            letterSpacing: '0.06em',
          }}
        >
          {project.year}
        </div>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.65,
            flex: 1,
            marginBottom: '1.25rem',
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
        </div>
      </motion.article>
    </div>
  )
}

function MiniProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.3)' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.85rem 1.1rem',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
      }}
      aria-label={`${project.title} — ${project.description}`}
    >
      <span style={{ fontSize: '1.5rem', lineHeight: 1 }} aria-hidden="true">
        {project.emoji}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            marginBottom: '0.1rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
          }}
        >
          {project.tech.slice(0, 2).join(' · ')}
        </div>
      </div>
      <svg
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        style={{ color: 'var(--text-muted)', flexShrink: 0 }}
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </motion.a>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section"
      aria-labelledby="projects-title"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 100% 0%, rgba(168,85,247,0.06) 0%, transparent 60%),
          var(--black)
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
          <p className="section-label">My Work</p>
          <h2 id="projects-title" className="section-title">
            Mission Board
          </h2>
          <p className="section-subtitle">
            Select a mission. Each project is a challenge I accepted, shipped, and learned from.
          </p>
        </motion.div>

        {/* Featured Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
            marginBottom: '4rem',
          }}
          role="list"
          aria-label="Featured projects"
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
              }}
            >
              // Other Missions
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, var(--border), transparent)',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '0.75rem',
            }}
            role="list"
            aria-label="Other projects"
          >
            {OTHER_PROJECTS.map((project) => (
              <MiniProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <a
            href="https://github.com/ashutoshpatraa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            See all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
