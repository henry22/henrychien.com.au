'use client'

import Socials from './socials'

export function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground mb-4 md:mb-0">
          © 2024 Matt Deal. All rights reserved.
        </p>
        <Socials />
      </div>
    </footer>
  )
}
