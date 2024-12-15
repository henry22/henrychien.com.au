import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/nav/nav'
import { Providers } from './providers'
import NavWrapper from '@/components/nav/nav-wrapper'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'Mattdeal.com.au',
  description: 'Portfolio website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NavWrapper />

          {children}
        </Providers>
      </body>
    </html>
  )
}
