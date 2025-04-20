import './globals.css'

import { SupportedLanguage } from '@/components'
import { multiLangText } from '@/components/language/multi-lang-text'
import { cookies } from '@/lib/cookies'
import { Viewport, type Metadata } from 'next'
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

export async function generateMetadata(): Promise<Metadata> {
  const [serverCookies] = await cookies.server()
  const saved = serverCookies.get<SupportedLanguage>('preferred-language')

  return {
    title: {
      default: multiLangText(metadataTexts.title, { lang: saved }),
      template: '%s | JS Starter Template'
    },
    description: multiLangText(metadataTexts.description, { lang: saved })
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
