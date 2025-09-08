'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useIsClient } from '@/hooks/useIsClient'
import { Links } from '@/contasnts'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'

const NavLinks = [
  { href: Links.Blog, label: 'Blog' },
  { href: Links.Projects, label: 'Projects' },
]

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const isClient = useIsClient()
  const url = usePathname()
  const activeLink = NavLinks.find(link => url.includes(link.href))

  if (!isClient) {
    return (
      <nav className="print:hidden sticky top-0 z-40 backdrop-blur-md bg-slate-200/40 dark:bg-gray-900/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
            <Link href="/">Henry Chien</Link>
          </h1>
          <div className="hidden md:flex items-center space-x-4">
            {NavLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="print:hidden sticky top-0 z-40 backdrop-blur-md bg-slate-200/40 dark:bg-gray-900/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">Henry Chien</Link>
        </motion.h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {NavLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                activeLink?.href === link.href ? 'text-primary' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {NavLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
