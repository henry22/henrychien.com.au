'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { PostHogProvider } from '@/components/PostHogProvider'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <div className="print:hidden">{/* <ReactQueryDevtools initialIsOpen={false} /> */}</div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <PostHogProvider>{children}</PostHogProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
