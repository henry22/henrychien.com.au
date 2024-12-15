export const Links = {
  Workshops: '/workshops',
  Projects: '/projects',
  Packages: '/packages',
  Blog: '/blog',
} as const

export const difficultyColors = {
  easy: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
} as const

export type Difficulty = keyof typeof difficultyColors
