import { readdirSync } from 'fs'
import path, { join } from 'path'
import { parsePublishedDate } from './utils/formatters'
import { fetchPosts } from './sanity/client'
import type { PortableTextBlock } from '@portabletext/types'

const POSTS_PATH = path.join(process.cwd(), 'src/posts')

// Types for different post sources
export interface MDXPost {
  title: string
  excerpt: string
  publishedAt: string
  readTime: number
  type: string
  difficulty: string
  slug: string
  category: string
  source: 'mdx'
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  mainImage?: unknown
  type: string
  readTime: number
  difficulty: string
  source: 'sanity'
  content?: PortableTextBlock[]
}

export type BlogPost = MDXPost | SanityPost

// Get posts from MDX files
async function getMDXPosts(): Promise<MDXPost[]> {
  const categories = readdirSync(POSTS_PATH, { withFileTypes: true }).filter(
    dir => dir.isDirectory() && !dir.name.startsWith('.')
  )

  const posts: MDXPost[] = []

  for (const category of categories) {
    const categoryPath = join(POSTS_PATH, category.name)
    const files = readdirSync(categoryPath).filter(file => file.endsWith('.mdx'))

    for (const file of files) {
      const post = await import(`@/posts/${category.name}/${file}`)
      const slug = file.replace(/\.mdx$/, '')

      posts.push({
        ...post.metadata,
        slug,
        category: category.name,
        source: 'mdx' as const,
      })
    }
  }

  return posts
}

// Get posts from Sanity CMS
async function getSanityPosts(): Promise<SanityPost[]> {
  try {
    const posts = await fetchPosts()
    return posts.map(
      (post: {
        _id: string
        title: string
        slug: { current: string } | string
        publishedAt: string
        excerpt: string
        mainImage?: unknown
        type: string
        readTime: number
        difficulty: string
        content?: PortableTextBlock[]
      }) => ({
        ...post,
        slug: typeof post.slug === 'object' ? post.slug : { current: post.slug },
        source: 'sanity' as const,
      })
    )
  } catch (error) {
    console.warn('Failed to fetch posts from Sanity:', error)
    return []
  }
}

// Combined function to get all posts from both sources
export async function getAllPosts(): Promise<BlogPost[]> {
  const [mdxPosts, sanityPosts] = await Promise.all([getMDXPosts(), getSanityPosts()])

  // Combine and sort all posts by publication date
  const allPosts = [...mdxPosts, ...sanityPosts]

  return allPosts.sort((a, b) => {
    const dateA =
      a.source === 'mdx'
        ? parsePublishedDate(a.publishedAt).getTime()
        : new Date(a.publishedAt).getTime()

    const dateB =
      b.source === 'mdx'
        ? parsePublishedDate(b.publishedAt).getTime()
        : new Date(b.publishedAt).getTime()

    return dateB - dateA
  })
}

export async function getPostBySlug(slug: string) {
  // First, try to find MDX post
  const categories = readdirSync(POSTS_PATH, { withFileTypes: true }).filter(
    dir => dir.isDirectory() && !dir.name.startsWith('.')
  )

  for (const category of categories) {
    try {
      const post = await import(`@/posts/${category.name}/${slug}.mdx`)
      return {
        ...post,
        category: category.name,
        source: 'mdx' as const,
      }
    } catch (error) {
      // Only log error if it's not a "module not found" error
      if ((error as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') {
        console.error('Error importing MDX post:', error)
      }
      continue
    }
  }

  // If not found in MDX, try Sanity CMS
  try {
    const { fetchPost } = await import('./sanity/client')
    const sanityPost = await fetchPost(slug)

    if (sanityPost) {
      return {
        ...sanityPost,
        metadata: {
          title: sanityPost.title,
          publishedAt: sanityPost.publishedAt,
          readTime: sanityPost.readTime,
          type: sanityPost.type,
          difficulty: sanityPost.difficulty,
        },
        source: 'sanity' as const,
      }
    }
  } catch (error) {
    console.warn('Error fetching post from Sanity:', error)
  }

  return null
}
