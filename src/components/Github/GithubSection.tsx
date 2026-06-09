import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import Github3DGlobe from './Github3DGlobe'
import Magnetic from '../ui/Magnetic'

interface GithubProfile {
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  bio: string
}

export default function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [profile, setProfile] = useState<GithubProfile | null>(null)
  
  // Custom glowing mouse effect for the main container
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    // Fetch live GitHub stats
    fetch('https://api.github.com/users/ashutoshpatraa')
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error('Failed to load GitHub data', err))
  }, [])

  return (
    <section
      id="github-command-center"
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 70% 60% at 50% 100%, rgba(132,204,22,0.04) 0%, transparent 60%),
          var(--surface-0)
        `,
        overflow: 'hidden',
      }}
    >
      {/* 3D Holographic Globe Background */}
      <Github3DGlobe />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="section-title" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            GitHub Command Center
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px' }}>
            A live command surface connected to GitHub public activity, repositories, and build momentum.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            onMouseMove={handleMouseMove}
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(20, 25, 20, 0.6)', // Slight green-dark tint
              borderColor: 'rgba(132,204,22,0.15)',
            }}
          >
            {/* Spotlight Hover Effect */}
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    350px circle at ${mouseX}px ${mouseY}px,
                    rgba(132,204,22,0.08),
                    transparent 80%
                  )
                `,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="GitHub Avatar"
                  style={{ width: '70px', height: '70px', borderRadius: '12px', border: '1px solid rgba(132,204,22,0.3)' }}
                />
              ) : (
                <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'var(--border)' }} />
              )}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                  @{profile?.login || 'loading...'}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#84cc16', boxShadow: '0 0 8px #84cc16' }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: '#84cc16', letterSpacing: '0.1em' }}>
                    SYSTEM ONLINE
                  </span>
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
              {profile?.bio || 'Building stuff. Turning ideas into real tech.'}
            </p>

            {/* Profile Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                  {profile?.followers ?? '-'}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  FOLLOWERS
                </div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                  {profile?.following ?? '-'}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  FOLLOWING
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Statistics Dashboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Top Bar Status */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card"
              style={{
                padding: '1.25rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(20, 25, 20, 0.6)',
                borderColor: 'rgba(132,204,22,0.15)',
              }}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: '#84cc16', letterSpacing: '0.1em' }}>
                LIVE CONNECTION
              </span>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  REPOSITORIES: {profile?.public_repos || '-'}
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ESTABLISHED: {profile ? new Date(profile.created_at).getFullYear() : '-'}
                </span>
              </div>
            </motion.div>

            {/* Main Stats Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="glass-card"
              style={{
                flex: 1,
                padding: '2rem',
                background: 'rgba(20, 25, 20, 0.6)',
                borderColor: 'rgba(132,204,22,0.15)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', color: '#84cc16', margin: 0, letterSpacing: '0.1em' }}>
                  STATISTICS DASHBOARD
                </h3>
                <span style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  API V3
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                <div style={{ borderLeft: '2px solid #84cc16', paddingLeft: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>
                    {profile?.public_repos ?? '-'}
                  </div>
                  <div style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
                    PUBLIC REPOS
                  </div>
                </div>
                
                <div style={{ borderLeft: '2px solid #00D4FF', paddingLeft: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>
                    {profile ? new Date().getFullYear() - new Date(profile.created_at).getFullYear() : '-'}
                  </div>
                  <div style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
                    YEARS ACTIVE
                  </div>
                </div>
              </div>

              {/* View GitHub Button */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
                <Magnetic intensity={0.2}>
                  <a
                    href={`https://github.com/${profile?.login || 'ashutoshpatraa'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ background: 'rgba(132,204,22,0.1)', color: '#84cc16', borderColor: 'rgba(132,204,22,0.3)' }}
                  >
                    View Global Profile
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CSS for responsiveness */}
        <style>{`
          @media (max-width: 900px) {
            #github-command-center .container > div:last-child {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
