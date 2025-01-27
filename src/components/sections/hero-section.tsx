'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Play } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { nightOwl } from 'code-mirror-night-owl/night-owl'
import { ParticlesBackground } from '../particles-background'

export function HeroSection() {
  const [code, setCode] = useState(`function greet(name) {
  return \`Hello, \${name}! Welcome to web development.\`;
}

// Try changing the name below and click 'Run'
console.log(greet('Developer'));`)

  const [output, setOutput] = useState('')

  const runCode = () => {
    // Clear previous output
    setOutput('')

    // Capture console.log output
    const originalLog = console.log
    console.log = (...args) => {
      setOutput(prev => prev + args.join(' ') + '\n')
    }

    try {
      eval(code)
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      console.log = originalLog
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-white p-4 relative">
      <ParticlesBackground />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 dark:text-white text-gray-900">
          Learn. Code. Innovate.
        </h1>
        <p className="text-xl md:text-2xl dark:text-blue-200 text-gray-600 max-w-2xl mx-auto">
          Empowering developers through interactive education and cutting-edge web development
          techniques.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden relative z-10"
      >
        <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <Button onClick={runCode} size="sm" className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" /> Run Code
          </Button>
        </div>
        <CodeMirror
          value={code}
          height="200px"
          theme={nightOwl}
          extensions={[javascript({ jsx: true })]}
          onChange={value => setCode(value)}
          className="text-sm"
        />
        <div className="bg-black p-4">
          <pre className="text-green-400 font-mono text-sm">{output}</pre>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 flex space-x-4"
      >
        <a
          href="https://www.linkedin.com/in/matt-deal-038177b5/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-blue-300 transition-colors dark:text-white"
        >
          <Github className="h-6 w-6" />
        </a>
        <a
          href="https://github.com/Dealsy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-blue-300 transition-colors dark:text-white"
        >
          <Linkedin className="h-6 w-6" />
        </a>
      </motion.div>
    </section>
  )
}
