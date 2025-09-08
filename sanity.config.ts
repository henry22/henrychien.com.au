'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Code input plugin for code blocks
    codeInput(),
  ],
  // Studio configuration to reduce React warnings
  studio: {
    components: {
      layout: (props: any) => {
        // Suppress React prop warnings in development
        if (typeof window !== 'undefined') {
          const originalError = console.error
          console.error = (...args) => {
            const message = args[0]
            if (
              typeof message === 'string' &&
              (message.includes('React does not recognize') ||
                message.includes('disableTransition') ||
                message.includes('prop on a DOM element'))
            ) {
              return // Suppress these warnings
            }
            originalError.apply(console, args)
          }
        }
        return props.renderDefault(props)
      },
    },
  },
})
