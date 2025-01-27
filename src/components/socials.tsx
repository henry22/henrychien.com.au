'use client'

import { getHero } from '@/lib/sanity/client'
import { HeroData } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

export default function Socials() {
  const { data: hero } = useQuery<HeroData>({
    queryKey: ['hero'],
    queryFn: getHero,
  })

  const socialLinks = {
    github: hero?.socialLinks?.github ?? 'https://github.com',
    linkedin: hero?.socialLinks?.linkedin ?? 'https://linkedin.com',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-8 flex space-x-4"
    >
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-blue-300 transition-colors dark:text-gray-400"
      >
        <Github className="h-6 w-6" />
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-blue-300 transition-colors dark:text-gray-400"
      >
        <Linkedin className="h-6 w-6" />
      </a>
    </motion.div>
  )
}
