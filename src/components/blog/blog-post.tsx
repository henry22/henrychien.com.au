'use client'

import { useState, useEffect, ReactElement } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { useQuery } from '@tanstack/react-query'
import { codeToHtml } from 'shiki/bundle/web'
import {
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers'
import { fetchPost } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Difficulty, difficultyColors } from '@/contasnts'

interface CodeBlock {
  _type: 'code'
  code: string
  filename?: string
  language: string
}

interface PortableTextProps {
  value: CodeBlock
}

function CodeBlockComponent({ value }: PortableTextProps): ReactElement {
  const [html, setHtml] = useState<string>()

  useEffect(() => {
    highlight(value.code, value.language || 'typescript')
      .then(setHtml)
      .catch(console.error)
  }, [value.code, value.language])

  return (
    <div className="my-8">
      {value.filename && (
        <div className="bg-[#011627] text-gray-200 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-[#1D3B53]">
          {value.filename}
        </div>
      )}
      <div
        className="rounded-b-lg text-sm overflow-hidden"
        dangerouslySetInnerHTML={{ __html: html || '' }}
      />
    </div>
  )
}

interface CustomPortableTextComponents extends PortableTextComponents {
  types: {
    code: (props: PortableTextProps) => ReactElement
  }
}

async function highlight(code: string, lang: string) {
  return codeToHtml(code, {
    lang,
    theme: 'night-owl',
    transformers: [
      transformerNotationHighlight(),
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerNotationWordHighlight(),
      transformerRenderWhitespace(),
    ],
  })
}

export default function BlogPost({ slug }: { slug: string }) {
  const [components, setComponents] = useState<CustomPortableTextComponents | null>(null)

  useEffect(() => {
    setComponents({
      types: {
        code: CodeBlockComponent,
      },
    })
  }, [])

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
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
      <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">{post.title}</h1>

      {/* Metadata Container */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-gray-400 mb-8">
        {/* Date and Read Time Group */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center min-w-[140px]">
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
            <time className="text-sm md:text-base">
              {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
            <span className="text-sm md:text-base">{post.readTime} min read</span>
          </div>
        </div>

        {/* Badges Group */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className={`${difficultyColors[post.difficulty as Difficulty]} text-sm`}
          >
            {post.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {post.type}
          </Badge>
        </div>
      </div>

      {post.mainImage && (
        <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            width={800}
            height={400}
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none prose-code:text-orange-500">
        {components && <PortableText value={post.content} components={components} />}
      </div>
    </article>
  )
}
