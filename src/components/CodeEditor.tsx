import { useEffect } from 'react'
import Editor, { loader } from '@monaco-editor/react'
import nightOwlTheme from 'monaco-themes/themes/Night Owl.json'
import type * as monaco from 'monaco-editor'

type CodeEditorProps = {
  initialValue: string
  onChange: (value: string) => void
  language?: string
  height?: string
  className?: string
}

type MonacoTheme = monaco.editor.IStandaloneThemeData

export default function CodeEditor({
  initialValue,
  onChange,
  language = 'typescript',
  height = '400px',
  className,
}: CodeEditorProps) {
  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('nightOwl', nightOwlTheme as MonacoTheme)
    })
  }, [])

  return (
    <div className={className}>
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={initialValue}
        theme="nightOwl"
        onChange={value => onChange(value ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          roundedSelection: false,
          padding: { top: 16 },
          tabSize: 2,
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          renderWhitespace: 'selection',
          detectIndentation: true,
          useTabStops: true,
          insertSpaces: true,
        }}
      />
    </div>
  )
}
