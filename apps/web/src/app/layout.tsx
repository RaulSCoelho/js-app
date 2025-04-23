import './globals.css'

import { generateMultiLangMetadata } from '@/components/language/multi-lang-text'
import { Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { metadataTexts } from './consts'
import { Providers } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export function generateMetadata() {
  return generateMultiLangMetadata({ ...metadataTexts, template: '%s | JS Starter Template' })
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-auto scroll-smooth antialiased scrollbar-thumb-active-primary/75 scrollbar-thumb-foreground/50 scrollbar-thumb-hover-foreground/75 scrollbar-track-background`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
