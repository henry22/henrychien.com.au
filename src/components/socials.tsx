import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

export default function Socials() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-8 flex space-x-4"
    >
      <a
        href="https://github.com/Dealsy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-blue-300 transition-colors dark:text-gray-400"
      >
        <Github className="h-6 w-6" />
      </a>
      <a
        href="https://www.linkedin.com/in/matt-deal-038177b5/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-blue-300 transition-colors dark:text-gray-400"
      >
        <Linkedin className="h-6 w-6" />
      </a>
    </motion.div>
  )
}
