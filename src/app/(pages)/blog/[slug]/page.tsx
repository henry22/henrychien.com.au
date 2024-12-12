import BlogPost from '@/components/blog/blog-post'
import { client } from '@/lib/sanity/client'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt
    }
  `,
    { slug },
  )

  return {
    title: `${post.title} | Your Name`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  return <BlogPost slug={slug} />
}
