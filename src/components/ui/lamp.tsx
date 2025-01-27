'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const colors = {
  cyan: {
    400: 'rgb(34 211 238)',
    500: 'rgb(6 182 212)',
  },
  purple: {
    400: 'rgb(192 132 252)',
    500: 'rgb(168 85 247)',
  },
  rose: {
    400: 'rgb(251 113 133)',
    500: 'rgb(244 63 94)',
  },
  blue: {
    400: 'rgb(96 165 250)',
    500: 'rgb(59 130 246)',
  },
  emerald: {
    400: 'rgb(52 211 153)',
    500: 'rgb(16 185 129)',
  },
} as const

export const LampContainer = ({
  children,
  className,
  color = 'cyan',
}: {
  children: React.ReactNode
  className?: string
  color?: keyof typeof colors
}) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 760)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const widths = {
    initial: isMobile ? '8rem' : '15rem',
    final: isMobile ? '15rem' : '40rem',
    blur: isMobile ? '10rem' : '30rem',
  }

  const colorStyle = {
    '--lamp-color-400': colors[color][400],
    '--lamp-color-500': colors[color][500],
  } as React.CSSProperties

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className={cn('relative w-full', className)}>{children}</div>
  }

  return (
    <div
      style={colorStyle}
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0',
        className
      )}
    >
      {theme === 'dark' && (
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          <motion.div
            initial={{ opacity: 0.5, width: widths.initial }}
            whileInView={{ opacity: 1, width: widths.final }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[var(--lamp-color-500)] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-[100%] left-0 bg-gray-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-[100%] left-0 bg-gray-900 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.5, width: widths.initial }}
            whileInView={{ opacity: 1, width: widths.final }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[var(--lamp-color-500)] text-white [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-40 h-[100%] right-0 bg-gray-900 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-[100%] right-0 bg-gray-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-gray-900 blur-2xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl bg-[var(--lamp-color-500)]"></div>
          <motion.div
            initial={{ width: widths.initial }}
            whileInView={{ width: widths.blur }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl bg-[var(--lamp-color-400)]"
          ></motion.div>
          <motion.div
            initial={{ width: widths.initial }}
            whileInView={{ width: widths.final }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[var(--lamp-color-400)]"
          ></motion.div>

          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-gray-900"></div>
        </div>
      )}

      <div className="relative z-50 flex flex-col items-center px-5 dark:-translate-y-40 md:-translate-y-80 translate-y-0">
        {children}
      </div>
    </div>
  )
}
