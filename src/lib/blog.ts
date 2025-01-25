import { readdirSync } from 'fs'
import { join } from 'path'
import { BlogMetadata } from '@/types/blog'

const POSTS_PATH = join(process.cwd(), 'posts')

export async function getAllPosts() {
  const categories = readdirSync(POSTS_PATH, { withFileTypes: true }).filter(
    dir => dir.isDirectory() && !dir.name.startsWith('.')
  )

  const posts = []

  for (const category of categories) {
    const categoryPath = join(POSTS_PATH, category.name)
    const files = readdirSync(categoryPath).filter(file => file.endsWith('.mdx'))

    for (const file of files) {
      const post = await import(`../../posts/${category.name}/${file}`)
      const slug = file.replace(/\.mdx$/, '')

      posts.push({
        ...post.metadata,
        slug,
        category: category.name,
      })
    }
  }

  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getPostBySlug(slug: string) {
  const categories = readdirSync(POSTS_PATH, { withFileTypes: true }).filter(
    dir => dir.isDirectory() && !dir.name.startsWith('.')
  )

  for (const category of categories) {
    try {
      const post = await import(`../../posts/${category.name}/${slug}.mdx`)
      return {
        ...post,
        category: category.name,
      }
    } catch (error) {
      // Post not found in this category, continue searching
      continue
    }
  }

  return null
}
