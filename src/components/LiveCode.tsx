'use client'

import { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import CodePreview from './CodePreview'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from './ui/button'
import { ClipboardIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type LiveCodeProps = {
  code: string
  height?: string
  language?: string
}

function formatCode(code: string): string {
  // Remove any leading/trailing whitespace
  let formatted = code.trim()

  // Split into lines
  const lines = formatted.split('\n')

  // Find the common indentation level
  const commonIndent = lines
    .filter(line => line.trim().length > 0)
    .reduce((min, line) => {
      const indent = line.match(/^\s*/)?.[0].length ?? 0
      return Math.min(min, indent)
    }, Infinity)

  // Remove common indentation and normalize
  formatted = lines
    .map(line => line.slice(commonIndent))
    .join('\n')
    .trim()

  return formatted
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

export default function LiveCode({ code, height = '400px' }: LiveCodeProps) {
  const formattedCode = formatCode(code)
  const [editorCode, setEditorCode] = useState(formattedCode)
  const [copied, setCopied] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1024px)')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editorCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ResizablePanelGroup
      direction={isMobile ? 'vertical' : 'horizontal'}
      className={cn(
        isMobile ? 'min-h-[600px]' : 'min-h-[400px]',
        'w-full rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
      )}
    >
      <ResizablePanel defaultSize={60} minSize={30}>
        <div className="relative h-full">
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-6 top-6 z-10"
            onClick={handleCopy}
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardIcon className="h-4 w-4" />
            )}
          </Button>
          <div className="h-full p-4">
            <CodeEditor
              initialValue={editorCode}
              onChange={setEditorCode}
              language={'html'}
              height={isMobile ? '400px' : height}
            />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={30}>
        <div className="h-full p-4">
          <CodePreview code={editorCode} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
