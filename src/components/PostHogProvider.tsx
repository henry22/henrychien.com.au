'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useIsClient } from '@/hooks/useIsClient'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient()
  const [isPostHogInitialized, setIsPostHogInitialized] = useState(false)

  useEffect(() => {
    if (!isClient) return

    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!posthogKey) {
      console.warn('PostHog API key not found. Analytics disabled.')
      return
    }

    try {
      posthog.init(posthogKey, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        capture_pageview: false, // We capture pageviews manually
        capture_pageleave: true, // Enable pageleave capture
        loaded: () => {
          console.log('PostHog loaded successfully')
          setIsPostHogInitialized(true)
        },
        on_xhr_error: failedRequest => {
          console.error('PostHog XHR error:', failedRequest)
        },
      })
    } catch (error) {
      console.error('PostHog initialization failed:', error)
    }
  }, [isClient])

  // Don't render PostHog provider on server-side
  if (!isClient || !isPostHogInitialized) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient || !pathname || !posthog) return

    try {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) {
        url += '?' + search
      }
      posthog.capture('$pageview', { $current_url: url })
    } catch (error) {
      console.error('PostHog pageview capture failed:', error)
    }
  }, [pathname, searchParams, posthog, isClient])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
