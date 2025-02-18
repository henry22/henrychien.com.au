'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { nightOwl } from 'code-mirror-night-owl/night-owl'
import { ParticlesBackground } from '../particles-background'
import LampContainer from '../ui/lamp'
import Socials from '../socials'
import Section from '../section'

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
    <Section className="">
      <ParticlesBackground />

      <LampContainer color="blue">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 relative z-10"
        >
          <h1 className="text-2xl md:text-6xl font-bold mb-4 dark:text-white text-gray-900">
            Learn. Code. Innovate.
          </h1>
          <p className="text-lg sm:text-xl px-4 sm:px-0 dark:text-blue-200 text-gray-600 sm:max-w-2xl mx-auto">
            Empowering developers through interactive education and cutting-edge web development
            techniques.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full sm:w-[calc(100vw-32px)] md:w-full max-w-2xl bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden relative z-10 mx-auto"
        >
          <div className="flex justify-between items-center bg-gray-700 px-4 py-2 gap-4">
            <div className="flex space-x-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <Button
              onClick={runCode}
              size="sm"
              className="bg-violet-500 hover:bg-violet-600 dark:text-white flex-shrink-0"
            >
              <Play className="w-4 h-4 mr-2" /> Run Code
            </Button>
          </div>
          <div className="w-full overflow-hidden">
            <div className="max-w-full overflow-x-auto">
              <CodeMirror
                value={code}
                height="200px"
                theme={nightOwl}
                extensions={[javascript({ jsx: true })]}
                onChange={value => setCode(value)}
                className="text-sm"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  bracketMatching: true,
                  highlightActiveLine: true,
                }}
                width="100%"
              />
            </div>
          </div>
          <div className="bg-black p-4">
            <pre className="text-green-400 font-mono text-sm">{output}</pre>
          </div>
        </motion.div>
        <Socials />
      </LampContainer>
    </Section>
  )
}
