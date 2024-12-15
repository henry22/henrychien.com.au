// src/components/studio/studio-component.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/lib/sanity.config'

export default function StudioComponent() {
  return <NextStudio config={config} />
}
