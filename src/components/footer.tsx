'use client'

import Socials from './socials'

export function Footer() {
  return (
    <footer className="bg-muted py-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground mb-4 md:mb-0">© 2025 Henry Chien.</p>
        <Socials />
      </div>
    </footer>
  )
}
