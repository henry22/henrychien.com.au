import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [structureTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
  cors: {
    origin: ['https://mattdeal.com.au', 'http://localhost:3000'],
    credentials: true,
  },
})
