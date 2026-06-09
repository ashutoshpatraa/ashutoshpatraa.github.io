export default function Footer() {
  const year = new Date().getFullYear()

  const NAV = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#timeline', label: 'Journey' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface-1)',
        padding: '2.5rem 0 2rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Back to top"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--text-muted)',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.85rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >
          {'< '}
          <span
            style={{
              fontFamily: 'Agustina, cursive',
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
            }}
          >
            Ashutosh Patra
          </span>
          {' />'}
        </a>

        {/* Nav */}
        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}
        >
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                textDecoration: 'none',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, var(--border), transparent)',
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          © {year}{' '}
          <strong style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>
            Ashutosh Patra
          </strong>{' '}
          (ashutoshpatraa). Crafted with ❤️ and ☕
        </p>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            letterSpacing: '0.06em',
          }}
        >
          Built with React · Three.js · Framer Motion · GSAP · Vite
        </p>
      </div>
    </footer>
  )
}
