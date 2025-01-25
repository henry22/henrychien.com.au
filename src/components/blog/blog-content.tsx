import path from 'path'
import fs from 'fs/promises'

export default async function BlogContent({ slug }: { slug: string }) {
  // Get all folders in the posts directory
  const postsDir = path.join(process.cwd(), 'src/posts')

  let categories
  try {
    categories = await fs.readdir(postsDir)
  } catch (error) {
    // Only log error if it's not a "directory not found" error
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error reading posts directory:', error)
    }
    return null
  }

  // Find the post in any category
  for (const category of categories) {
    const mdxPath = path.join(postsDir, category, `${slug}.mdx`)

    try {
      await fs.access(mdxPath)
      const Content = (await import(`@/posts/${category}/${slug}.mdx`)).default

      return (
        <div className="prose prose-lg max-w-none w-full prose-slate dark:prose-invert prose-pre:max-w-none prose-pre:w-full prose-code:text-purple-600 prose-code:bg-inherit dark:prose-code:text-[#80cbc4] prose-code:before:content-none prose-code:after:content-none">
          <Content />
        </div>
      )
    } catch {
      continue
    }
  }

  return null
}
