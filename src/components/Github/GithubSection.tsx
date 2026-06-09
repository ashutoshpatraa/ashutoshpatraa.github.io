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

interface GithubRepo {
  id: number
  name: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  html_url: string
}

interface GithubEvent {
  id: string
  type: string
  created_at: string
  repo: { name: string }
}

export default function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  
  const [profile, setProfile] = useState<GithubProfile | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [events, setEvents] = useState<GithubEvent[]>([])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    const username = 'ashutoshpatraa'
    
    // Fetch Profile
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(console.error)

    // Fetch Repos (sorted by updated)
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch(console.error)

    // Fetch Events (latest 5)
    fetch(`https://api.github.com/users/${username}/events/public?per_page=5`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error)
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds} SECONDS AGO`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} MINUTES AGO`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} HOURS AGO`
    return `${Math.floor(diffInSeconds / 86400)} DAYS AGO`
  }

  const getEventDescription = (event: GithubEvent) => {
    switch (event.type) {
      case 'PushEvent': return `Pushed commits to ${event.repo.name.split('/')[1]}`
      case 'CreateEvent': return `Created resource in ${event.repo.name.split('/')[1]}`
      case 'WatchEvent': return `Starred ${event.repo.name.split('/')[1]}`
      case 'ForkEvent': return `Forked ${event.repo.name.split('/')[1]}`
      default: return `Activity in ${event.repo.name.split('/')[1]}`
    }
  }

  const getEventBadge = (event: GithubEvent) => {
    switch (event.type) {
      case 'PushEvent': return { text: 'PUSH', color: 'var(--blue)' }
      case 'CreateEvent': return { text: 'NEW', color: 'var(--purple)' }
      case 'WatchEvent': return { text: 'STAR', color: '#EAB308' }
      default: return { text: 'ACT', color: 'var(--text-muted)' }
    }
  }

  return (
    <section
      id="github-command-center"
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,212,255,0.03) 0%, transparent 60%),
          var(--surface-0)
        `,
        overflow: 'hidden',
      }}
    >
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
            Open Source Nexus
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px' }}>
            A live connection surface synced to my GitHub public activity, repositories, and build momentum.
          </p>
        </motion.div>

        {/* Top Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card"
          style={{
            padding: '1.25rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--blue)', letterSpacing: '0.1em' }}>
              SYSTEM ONLINE
            </span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              REPOSITORIES TRACKED: {profile?.public_repos || '-'}
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              LAST EVENT: {events.length > 0 ? formatTimeAgo(events[0].created_at) : '-'}
            </span>
          </div>
        </motion.div>

        {/* Row 1: Profile & Stats Dashboard */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}
          className="github-grid-row-1"
        >
          {/* Profile Card */}
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
            }}
          >
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(0,212,255,0.08), transparent 80%)`,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="GitHub Avatar" style={{ width: '70px', height: '70px', borderRadius: '12px', border: '1px solid rgba(0,212,255,0.3)' }} />
              ) : (
                <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'var(--border)' }} />
              )}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                  @{profile?.login || 'loading...'}
                </h3>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--purple)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>
                  BUILDING STUFF
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
              {profile?.bio || 'Turning ideas into real tech.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
              <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{profile?.followers ?? '-'}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>FOLLOWERS</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{profile?.following ?? '-'}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>FOLLOWING</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{profile ? new Date(profile.created_at).getFullYear() : '-'}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>CREATED</div>
              </div>
            </div>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', color: 'var(--blue)', margin: 0, letterSpacing: '0.1em' }}>
                STATISTICS DASHBOARD
              </h3>
              <span style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                API V3
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1.5rem', flex: 1, alignItems: 'center' }}>
              <div style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>{profile?.public_repos ?? '-'}</div>
                <div style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>REPOSITORIES</div>
              </div>
              <div style={{ borderLeft: '2px solid var(--purple)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>
                  {repos.reduce((acc, curr) => acc + curr.stargazers_count, 0)}
                </div>
                <div style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>STARS (RECENT)</div>
              </div>
              <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>{events.length}</div>
                <div style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>RECENT EVENTS</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Repos & Activity Feed */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1.5rem',
          }}
          className="github-grid-row-2"
        >
          {/* Active Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', color: 'var(--blue)', margin: 0, letterSpacing: '0.1em' }}>
                ACTIVE REPOSITORIES
              </h3>
              <Magnetic intensity={0.2}>
                <a
                  href={`https://github.com/${profile?.login || 'ashutoshpatraa'}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}
                >
                  OPEN GITHUB
                </a>
              </Magnetic>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {repos.map((repo, i) => (
                <div key={repo.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--blue)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}>
                      {repo.name}
                    </a>
                    {i === 0 && (
                      <span style={{ fontSize: '0.55rem', fontFamily: "'Space Mono', monospace", color: 'var(--blue)', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', padding: '0.2rem 0.5rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                        ACTIVE NOW
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {repo.language && (
                      <span style={{ fontSize: '0.6rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                        {repo.language.toUpperCase()}
                      </span>
                    )}
                    <span style={{ fontSize: '0.6rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                      STARS {repo.stargazers_count}
                    </span>
                    <span style={{ fontSize: '0.6rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                      FORKS {repo.forks_count}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.6rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)' }}>
                      UPDATED: {formatTimeAgo(repo.updated_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', color: 'var(--blue)', margin: '0 0 1rem 0', letterSpacing: '0.1em' }}>
              LIVE ACTIVITY FEED
            </h3>
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              {events.map((event, i) => {
                const badge = getEventBadge(event)
                return (
                  <div key={event.id} style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${badge.color}66`, background: `${badge.color}11`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: badge.color
                    }}>
                      {badge.text}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.2rem' }}>
                        {getEventDescription(event)}
                      </div>
                      <div style={{ fontSize: '0.65rem', fontFamily: "'Space Mono', monospace", color: 'var(--text-muted)' }}>
                        {formatTimeAgo(event.created_at)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* CSS for responsiveness */}
        <style>{`
          @media (max-width: 1024px) {
            .github-grid-row-1, .github-grid-row-2 {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
