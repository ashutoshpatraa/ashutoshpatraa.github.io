export interface Project {
  id: string
  title: string
  emoji: string
  description: string
  tech: string[]
  github: string
  demo?: string
  gradient: string
  status: 'completed' | 'in-progress' | 'concept'
  featured: boolean
  year: string
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'focusplay',
    title: 'FocusPlay',
    emoji: '🎯',
    description:
      'A productivity app with Pomodoro timer and a points system to make studying feel a bit more like a game. Built while trying to study for my own exams.',
    tech: ['Python', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/ashutoshpatraa/FocusPlay',
    gradient: 'linear-gradient(135deg, #00D4FF22, #8B5CF622)',
    status: 'completed',
    featured: true,
    year: '2025',
  },
  {
    id: 'studylogix',
    title: 'StudyLogix',
    emoji: '📚',
    description:
      'A web app to track how long I study each day, with a Pomodoro timer and subject-wise notes. One of my first proper HTML/CSS/JS projects.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ashutoshpatraa/StudyLogix',
    demo: 'https://studylogix.app/',
    gradient: 'linear-gradient(135deg, #22D3EE22, #4ADE8022)',
    status: 'completed',
    featured: true,
    year: '2024',
  },
  {
    id: 'fileninja',
    title: 'FileNinja',
    emoji: '🥷',
    description:
      'A Python script that automatically sorts files in a folder by their type (images, docs, etc). Helped me clean up my messy downloads folder.',
    tech: ['Python', 'File Automation'],
    github: 'https://github.com/ashutoshpatraa/FILENINJA',
    gradient: 'linear-gradient(135deg, #F9731622, #FB923C22)',
    status: 'completed',
    featured: true,
    year: '2024',
  },
  {
    id: 'paimons-codex',
    title: "Paimon's Codex",
    emoji: '⭐',
    description:
      'A Genshin Impact character info site I made because I love the game. Shows character stats and element info. My first time working with a public API.',
    tech: ['HTML', 'CSS', 'JavaScript', 'API'],
    github: 'https://github.com/ashutoshpatraa/paimons-codex',
    gradient: 'linear-gradient(135deg, #A855F722, #EC489922)',
    status: 'completed',
    featured: true,
    year: '2025',
  },
  {
    id: 'grademate',
    title: 'GradeMate',
    emoji: '🎓',
    description:
      'A simple CGPA calculator for students. You enter your marks and it shows your grade. Made this because I kept doing the math wrong by hand.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ashutoshpatraa/GradeMate',
    gradient: 'linear-gradient(135deg, #4ADE8022, #22D3EE22)',
    status: 'completed',
    featured: true,
    year: '2025',
  },
]

export const OTHER_PROJECTS: Project[] = [
  {
    id: 'pogger',
    title: 'Pogger',
    emoji: '🏓',
    description: 'A ping pong game in the browser. One of my first fun side projects.',
    tech: ['Kaboom.js', 'HTML', 'JS'],
    github: 'https://github.com/ashutoshpatraa/Pogger',
    demo: 'https://ashutoshpatraa.github.io/pogger',
    gradient: 'linear-gradient(135deg, #4ADE8022, #22D3EE22)',
    status: 'completed',
    featured: false,
    year: '2023',
  },
  {
    id: 'super-mario',
    title: 'Super Mario Py',
    emoji: '🍄',
    description: 'A Mario clone in Python using Pygame. Followed a tutorial and then tweaked it.',
    tech: ['Python', 'Pygame'],
    github: 'https://github.com/ashutoshpatraa/super-mario-python',
    gradient: 'linear-gradient(135deg, #FB923C22, #F9731622)',
    status: 'completed',
    featured: false,
    year: '2022',
  },
  {
    id: 'poler',
    title: 'Poler',
    emoji: '🤖',
    description: 'A simple chatbot for mental health support. Basic keyword-based responses.',
    tech: ['Python', 'Chatbot'],
    github: 'https://github.com/ashutoshpatraa/Poler',
    gradient: 'linear-gradient(135deg, #A855F722, #8B5CF622)',
    status: 'completed',
    featured: false,
    year: '2023',
  },
  {
    id: 'therapyhub',
    title: 'TherapyHub',
    emoji: '❤️',
    description: 'A peer support site for mental health awareness. Built with Flask and MySQL.',
    tech: ['Python', 'Flask', 'MySQL'],
    github: 'https://github.com/ashutoshpatraa/TherapyHub',
    gradient: 'linear-gradient(135deg, #EC489922, #F9731622)',
    status: 'completed',
    featured: false,
    year: '2024',
  },
  {
    id: 'eduvr',
    title: 'EduVR',
    emoji: '🥽',
    description: 'An experiment with 3D on the web. Still figuring out WebGL.',
    tech: ['HTML', 'CSS', 'WebGL'],
    github: 'https://github.com/ashutoshpatraa/EduVR',
    demo: 'https://ashutoshpatraa.github.io/EduVR/',
    gradient: 'linear-gradient(135deg, #00D4FF22, #22D3EE22)',
    status: 'completed',
    featured: false,
    year: '2023',
  },
  {
    id: 'auraplayer',
    title: 'AuraPlayer',
    emoji: '🎵',
    description: 'A Spotify lyrics visualizer experiment. Music + code = fun.',
    tech: ['JavaScript', 'Spotify API', 'CSS'],
    github: 'https://github.com/ashutoshpatraa/AuraPlayer',
    gradient: 'linear-gradient(135deg, #22D3EE22, #A855F722)',
    status: 'completed',
    featured: false,
    year: '2024',
  },
  {
    id: 'artiste',
    title: 'Artiste',
    emoji: '🎨',
    description: 'An art marketplace site concept. Mostly a design + HTML practice project.',
    tech: ['HTML', 'CSS', 'JS'],
    github: 'https://github.com/ashu-pp/artiste-website',
    gradient: 'linear-gradient(135deg, #F9731622, #A855F722)',
    status: 'completed',
    featured: false,
    year: '2023',
  },
]
