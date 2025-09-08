'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useIsClient } from '@/hooks/useIsClient'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    const toggleVisible = () => {
      setVisible(window.pageYOffset > 500)
    }

    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [isClient])

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-3 bg-primary rounded-full text-white shadow-lg z-1000"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  )
}
