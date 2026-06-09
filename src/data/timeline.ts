export interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: string
  tags: string[]
  highlight?: boolean
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2020',
    title: 'The Spark — Lua & Roblox',
    description:
      "Started scripting in Lua for Roblox. Built my first games, learned about events, functions, and game loops. Realized I could create worlds — that's when coding clicked.",
    icon: '🎮',
    tags: ['Lua', 'Roblox', 'Game Dev'],
  },
  {
    year: '2021',
    title: 'Hello, Python',
    description:
      'Discovered Python and fell in love. Built CLI tools, simple games with Pygame, and started exploring basic automation. First commits on GitHub.',
    icon: '🐍',
    tags: ['Python', 'Pygame', 'GitHub'],
  },
  {
    year: '2022',
    title: 'The Web Awaits',
    description:
      'Dived deep into HTML, CSS, JavaScript. Built my first portfolio site, learned responsive design, and deployed projects to GitHub Pages for the world to see.',
    icon: '🌐',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Dev'],
    highlight: true,
  },
  {
    year: '2023',
    title: 'Experimenting & Building',
    description:
      'Tried out basic Machine Learning tutorials. Built Poler (a simple chatbot) and TherapyHub. Participated in my first hackathons and kept learning.',
    icon: '🤖',
    tags: ['Python', 'Learning ML', 'Chatbot'],
    highlight: true,
  },
  {
    year: '2024',
    title: 'Getting Serious',
    description:
      'Built StudyLogix, FileNinja, and AuraPlayer. Started exploring open source, played around with React and Node.js basics, and got more comfortable with coding.',
    icon: '🚀',
    tags: ['Learning React', 'Node.js', 'Open Source'],
    highlight: true,
  },
  {
    year: '2025',
    title: 'Current Chapter',
    description:
      "School finals, FocusPlay, Paimon's Codex, and GradeMate shipped. Starting to learn TypeScript and 3D web development. Preparing for university.",
    icon: '⭐',
    tags: ['TypeScript basics', 'Three.js', 'Projects'],
    highlight: true,
  },
  {
    year: '2026+',
    title: 'The Journey Continues',
    description:
      'Computer Science university journey begins. My goal is to become a software engineer. Just keeping my head down, learning, and having fun building things.',
    icon: '🎓',
    tags: ['University', 'CS', 'Future SWE'],
  },
]
