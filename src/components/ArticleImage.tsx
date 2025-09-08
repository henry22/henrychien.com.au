'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const sizeClasses = {
  xs: 'max-w-xs', // max-width: 384px
  small: 'max-w-sm', // max-width: 384px
  medium: 'max-w-xl', // max-width: 576px
  large: 'max-w-3xl', // max-width: 768px
  xlarge: 'max-w-4xl', // max-width: 1024px
  xxlarge: 'max-w-5xl', // max-width: 1280px
  full: 'max-w-full',
} as const

type ImageSize = keyof typeof sizeClasses

type ThemeImageProps = {
  darkSrc: string
  lightSrc: string
  alt: string
  className?: string
  size?: ImageSize
}

export default function ArticleImage({
  darkSrc,
  lightSrc,
  alt,
  className = '',
  size = 'medium',
}: ThemeImageProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light'
  const src = currentTheme === 'dark' ? darkSrc : lightSrc

  return (
    <div className={cn('w-full mx-auto my-8', sizeClasses[size], className)}>
      <Image src={src} alt={alt} className="w-full h-auto" width={1200} height={800} priority />
    </div>
  )
}
