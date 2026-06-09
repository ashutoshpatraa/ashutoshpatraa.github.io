import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import Magnetic from '../ui/Magnetic'
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from '../../data/skills'

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All')

  const filteredSkills =
    activeCategory === 'All' ? SKILLS : SKILLS.filter((s) => s.category === activeCategory)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section"
      style={{
        background: `
          radial-gradient(ellipse 50% 60% at 0% 50%, rgba(0,212,255,0.04) 0%, transparent 60%),
          var(--surface-0)
        `,
      }}
      aria-labelledby="skills-title"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Tech Arsenal</p>
          <h2 id="skills-title" className="section-title">
            Skill Constellation
          </h2>
          <p className="section-subtitle">
            My technology universe — spanning languages, frameworks, tools, and creative software.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
          role="group"
          aria-label="Filter skills by category"
        >
          {(['All', ...SKILL_CATEGORIES.map((c) => c.name)] as (SkillCategory | 'All')[]).map(
            (cat) => {
              const catData = SKILL_CATEGORIES.find((c) => c.name === cat)
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '99px',
                    border: isActive
                      ? `1px solid ${catData?.color || 'var(--blue)'}`
                      : '1px solid var(--border)',
                    background: isActive
                      ? `${catData?.color || 'var(--blue)'}18`
                      : 'transparent',
                    color: isActive ? catData?.color || 'var(--blue)' : 'var(--text-muted)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.78rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? `0 0 12px ${catData?.color || 'var(--blue)'}33` : 'none',
                  }}
                >
                  {catData?.icon} {cat}
                </button>
              )
            }
          )}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {filteredSkills.map(({ name, icon, level, category }, i) => {
              const catColor = SKILL_CATEGORIES.find((c) => c.name === category)?.color || 'var(--blue)'
              const mouseX = useMotionValue(0)
              const mouseY = useMotionValue(0)

              function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
                const { left, top } = currentTarget.getBoundingClientRect()
                mouseX.set(clientX - left)
                mouseY.set(clientY - top)
              }

              return (
                <Magnetic key={name} intensity={0.1}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    className="skill-node glass-card"
                  onMouseMove={handleMouseMove}
                  role="listitem"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = catColor + '66'
                    el.style.transform = 'translateY(-4px) scale(1.02)'
                    el.style.boxShadow = `0 8px 24px rgba(0,0,0,0.4), 0 0 20px ${catColor}22`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--glass-border)'
                    el.style.transform = 'translateY(0) scale(1)'
                    el.style.boxShadow = 'var(--glass-shadow)'
                  }}
                  style={{
                    padding: '1rem 1.1rem',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Cursor-following glow effect */}
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          250px circle at ${mouseX}px ${mouseY}px,
                          ${catColor}33,
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  
                  {/* Icon + Name row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.75rem',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span style={{ fontSize: '1.3rem', lineHeight: 1 }} aria-hidden="true">
                      {icon}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {name}
                    </span>
                  </div>

                  {/* Level dots */}
                  <div
                    style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
                    aria-label={`Proficiency: ${level} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, di) => (
                      <span
                        key={di}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: di < level ? catColor : 'rgba(255,255,255,0.08)',
                          boxShadow: di < level ? `0 0 5px ${catColor}88` : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    ))}
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        marginLeft: '4px',
                      }}
                    >
                      {['', 'NOVICE', 'BASIC', 'SKILLED', 'ADVANCED', 'EXPERT'][level]}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div
                    style={{
                      marginTop: '0.6rem',
                      display: 'inline-flex',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      background: `${catColor}12`,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.6rem',
                      color: catColor,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {category}
                  </div>
                </motion.div>
                </Magnetic>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            padding: '1.5rem 2rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid var(--border)',
            justifyContent: 'space-around',
          }}
          aria-label="Skill summary statistics"
        >
          {SKILL_CATEGORIES.map(({ name, color, icon }) => {
            const count = SKILLS.filter((s) => s.category === name).length
            return (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color,
                    marginBottom: '0.2rem',
                  }}
                >
                  {count}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {icon} {name}
                </div>
              </div>
            )
          })}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.2rem',
              }}
            >
              {SKILLS.length}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
              }}
            >
              ✨ Total Skills
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
