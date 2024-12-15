'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import the Studio component with no SSR
const Studio = dynamic(() => import('@/components/studio/studio-component'), {
  ssr: false,
})

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Studio />
    </Suspense>
  )
}
