export const Links = {
  Projects: '/projects',
  Blog: '/blog',
} as const

export const difficultyColors = {
  easy: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
} as const

export const difficultyFilterColors = {
  easy: {
    default: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    selected: 'bg-green-500/30 text-green-500 hover:bg-green-500/40',
  },
  intermediate: {
    default: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
    selected: 'bg-yellow-500/30 text-yellow-500 hover:bg-yellow-500/40',
  },
  advanced: {
    default: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    selected: 'bg-red-500/30 text-red-500 hover:bg-red-500/40',
  },
} as const

export type Difficulty = keyof typeof difficultyColors
