'use client'

import { LanguageProvider } from '@/components'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class">
        <HeroUIProvider navigate={router.push}>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
