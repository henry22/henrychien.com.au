import type { MDXComponents } from 'mdx/types'
import CodeBlock from '@/components/CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // @ts-ignore
    pre: CodeBlock,
    ...components,
  }
}
