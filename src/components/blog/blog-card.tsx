import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { Post } from '@/types/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      prefetch={true}
      className="text-primary hover:scale-105 hover:border-blue-500 hover:border-2 rounded-lg transition duration-300">
      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
