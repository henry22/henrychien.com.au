'use client'

import { usePathname } from 'next/navigation'
import Nav from './nav'

export default function NavWrapper() {
  const pathname = usePathname()

  if (pathname.includes('/studio')) {
    return null
  }

  return <Nav />
}
