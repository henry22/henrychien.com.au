'use client'

import { motion } from 'framer-motion'

export function ProjectsHeader() {
  return (
    <header className="mb-12">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        Featured Projects
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        A collection of my projects and applications
      </motion.p>
    </header>
  )
}
