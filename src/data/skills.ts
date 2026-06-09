export interface Skill {
  name: string
  icon: string
  level: 1 | 2 | 3 | 4 | 5
  category: SkillCategory
  color: string
}

export type SkillCategory =
  | 'Languages'
  | 'Web Dev'
  | 'Tools'
  | 'Data Science'
  | 'Creative'

export const SKILLS: Skill[] = [
  // Languages — honest levels for someone still learning
  { name: 'Python', icon: '🐍', level: 3, category: 'Languages', color: '#3776AB' },
  { name: 'JavaScript', icon: '⚡', level: 2, category: 'Languages', color: '#F7DF1E' },
  { name: 'HTML5', icon: '🌐', level: 4, category: 'Languages', color: '#E34C26' },
  { name: 'CSS3', icon: '🎨', level: 3, category: 'Languages', color: '#264DE4' },
  { name: 'C', icon: '⚙️', level: 1, category: 'Languages', color: '#A8B9CC' },
  { name: 'Lua', icon: '🌙', level: 2, category: 'Languages', color: '#000080' },

  // Web Dev
  { name: 'React', icon: '⚛️', level: 1, category: 'Web Dev', color: '#61DBFB' },
  { name: 'TailwindCSS', icon: '🌊', level: 2, category: 'Web Dev', color: '#38BDF8' },
  { name: 'Bootstrap', icon: '🅱️', level: 2, category: 'Web Dev', color: '#7952B3' },
  { name: 'Node.js', icon: '🟩', level: 1, category: 'Web Dev', color: '#68A063' },
  { name: 'MySQL', icon: '🐬', level: 1, category: 'Web Dev', color: '#00758F' },

  // Tools
  { name: 'VS Code', icon: '💻', level: 4, category: 'Tools', color: '#007ACC' },
  { name: 'Git', icon: '🌿', level: 2, category: 'Tools', color: '#F05032' },
  { name: 'GitHub', icon: '🐙', level: 3, category: 'Tools', color: '#FFFFFF' },
  { name: 'Linux', icon: '🐧', level: 1, category: 'Tools', color: '#FCC624' },

  // Data Science — just learning
  { name: 'Pandas', icon: '🐼', level: 2, category: 'Data Science', color: '#150458' },
  { name: 'NumPy', icon: '🔢', level: 2, category: 'Data Science', color: '#4DABCF' },
  { name: 'Matplotlib', icon: '📊', level: 1, category: 'Data Science', color: '#11557C' },

  // Creative — things I genuinely enjoy
  { name: 'Canva', icon: '✏️', level: 3, category: 'Creative', color: '#00C4CC' },
  { name: 'Figma', icon: '🎭', level: 1, category: 'Creative', color: '#F24E1E' },
  { name: 'Blender', icon: '🫐', level: 1, category: 'Creative', color: '#E87D0D' },
]

export const SKILL_CATEGORIES: { name: SkillCategory; color: string; icon: string }[] = [
  { name: 'Languages', color: '#00D4FF', icon: '< />' },
  { name: 'Web Dev', color: '#A855F7', icon: '🌐' },
  { name: 'Tools', color: '#4ADE80', icon: '🔧' },
  { name: 'Data Science', color: '#FB923C', icon: '📈' },
  { name: 'Creative', color: '#EC4899', icon: '🎨' },
]

export const STAT_BARS = [
  { label: 'Curiosity', value: 95, color: '#00D4FF' },
  { label: 'Creativity', value: 80, color: '#A855F7' },
  { label: 'Consistency', value: 70, color: '#4ADE80' },
  { label: 'Learning Speed', value: 85, color: '#FB923C' },
  { label: 'Problem Solving', value: 65, color: '#22D3EE' },
]
