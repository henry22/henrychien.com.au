import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BackButton() {
  return (
    <Link
      href="/blog"
      className={cn(
        'group inline-flex items-center gap-2 text-muted-foreground',
        'hover:text-primary transition-colors duration-300',
        'mb-8 sm:mb-12'
      )}
    >
      <ArrowLeft
        className={cn('w-5 h-5 transition-transform duration-300', 'group-hover:-translate-x-1')}
      />
      <span className="text-sm font-medium">Back to Blog</span>
    </Link>
  )
}
