'use client'

import { getHero } from '@/lib/sanity/client'
import { HeroData } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const { data: hero } = useQuery<HeroData>({
    queryKey: ['hero'],
    queryFn: getHero,
  })

  const socialLinks = {
    github: hero?.socialLinks?.github ?? 'https://github.com',
    linkedin: hero?.socialLinks?.linkedin ?? 'https://linkedin.com',
  }

  return (
    <footer className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground mb-4 md:mb-0">
          © 2024 Matt Deal. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}
