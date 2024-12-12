'use client'

import { useQuery } from '@tanstack/react-query'
import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface CodeBlock {
  _type: 'code'
  code: string
  filename?: string
  language: string
}

const components = {
  types: {
    code: ({ value }: { value: CodeBlock }) => (
      <div className="my-8">
        {value.filename && (
          <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700">
            {value.filename}
          </div>
        )}
        <SyntaxHighlighter
          language={value.language || 'typescript'}
          style={vscDarkPlus}
          className="rounded-b-lg text-sm"
          showLineNumbers>
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
  },
}

export default function BlogPost({ slug }: { slug: string }) {
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      return client.fetch(
        `
        *[_type == "post" && slug.current == $slug][0] {
          title,
          publishedAt,
          mainImage,
          content,
          estimatedReadingTime
        }
      `,
        { slug },
      )
    },
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex space-x-4 mb-8">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-[400px] w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <p className="text-gray-400">The requested blog post could not be found.</p>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
      <div className="flex items-center text-gray-400 mb-8 space-x-4">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <time>
            {new Date(post.publishedAt).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        {post.estimatedReadingTime && (
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-2" />
            <span>{post.estimatedReadingTime} min read</span>
          </div>
        )}
      </div>

      {post.mainImage && (
        <div className="mb-12 aspect-video relative rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none">
        <PortableText value={post.content} components={components} />
      </div>
    </article>
  )
}
