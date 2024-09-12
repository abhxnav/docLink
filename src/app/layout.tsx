import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'DocLink - Book appointment, track health',
  description: `A heathcare management tool. Book your doctor's appointment. Track your health.`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen bg-dark-300 font-sans antialiased`,
          fontRoboto.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
