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

type SanityImage = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

type Slug = {
  _type: 'slug'
  current: string
}

type PortableTextBlock = {
  _type: 'block'
  _key: string
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: {
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }[]
  markDefs?: {
    _key: string
    _type: string
    href?: string
  }[]
}

type CodeBlock = {
  _type: 'code'
  _key: string
  code: string
  filename?: string
  language: string
}

export type Post = {
  _id: string
  title: string
  slug: Slug
  publishedAt: string
  excerpt: string
  mainImage: SanityImage
  readTime: number
  difficulty: 'easy' | 'intermediate' | 'advanced'
  type: string
  content?: (PortableTextBlock | CodeBlock)[]
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

export type HeroData = {
  title: string
  subtitle: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    resume?: string
  }
  codeSnippet: Snippet[]
}

export type Snippet = {
  _type: string
  code: string
  language: string
}
