export type Project = {
  _id: string
  name: string
  description: string
  tech: string[]
  link: string
  github: string
  image: string
  features: string[]
}

export type Post = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  mainImage: string
}

export interface Workshop {
  _id: string
  title: string
  description: string
  duration: string
  level: string
  topics: string[]
  github: string
  image: string
  upcoming?: {
    date: string
    location: string
    registrationLink: string
  }
  recordingLink?: string
  resources: string[]
}
