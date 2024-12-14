'use client'

import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki/bundle/web'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  animate?: boolean
}

async function highlight(code: string, lang: string) {
  if (!code) return ''
  return codeToHtml(code, {
    lang,
    theme: 'night-owl',
    transformers: [
      {
        name: 'line-transformer',
        pre(node) {
          // Add class to pre element for animation container
          node.properties.class = ['shiki', 'typing-animation']
        },
        line(node) {
          // Add class to each line for individual animations
          node.properties.class = ['typing-line']
          return node
        },
      },
    ],
  })
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [html, setHtml] = useState<string>()

  useEffect(() => {
    if (code) {
      highlight(code, language).then(setHtml).catch(console.error)
    }
  }, [code, language])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (!code || !html) return null

  return (
    <div className="my-8">
      {filename && (
        <div className="bg-[#011627] text-gray-200 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-[#1D3B53]">
          {filename}
        </div>
      )}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="rounded-b-lg text-sm overflow-hidden">
        <div className="p-4" dangerouslySetInnerHTML={{ __html: html }} />
      </motion.div>
    </div>
  )
}
