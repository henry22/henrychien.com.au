import { MDXComponents } from 'mdx/types'
import BlogCodeBlock from '@/components/blog/blog-code-block'
import { ComponentProps } from 'react'

type PreProps = ComponentProps<'pre'>

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: (props: PreProps) => <BlogCodeBlock {...props} />,
    ...components,
  }
}
