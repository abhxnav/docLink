import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components'
import { Suspense, type ReactNode } from 'react'
import { Toaster } from '@/components/ui'
import Loading from '@/app/loading'

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'DocLink - Book appointment, track health',
  description: `A healthcare management tool. Book your doctor's appointment. Track your health.`,
  icons: {
    icon: '/favicon.ico',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen bg-dark-300 font-sans antialiased`,
          fontRoboto.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
