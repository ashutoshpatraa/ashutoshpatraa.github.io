import { useState } from 'react'
import CustomCursor from './components/ui/CustomCursor'
import LoadingScreen from './components/ui/LoadingScreen'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import SkillsSection from './components/Skills/SkillsSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import TimelineSection from './components/Timeline/TimelineSection'
import GithubSection from './components/Github/GithubSection'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/layout/Footer'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {/* Subtle film grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading screen — shown until isLoaded */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Skip to content (accessibility) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main site */}
      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: isLoaded ? 'auto' : 'none',
        }}
      >
        <Navbar />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <GithubSection />
          <TimelineSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
