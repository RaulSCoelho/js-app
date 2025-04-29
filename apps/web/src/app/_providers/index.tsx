'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from 'next-themes'

import { LanguageProvider } from '@/components/language'
import { ConfirmationModal } from '@/components/modal'

import { UserProvider } from './user-provider'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <HeroUIProvider navigate={router.push}>
          <UserProvider>{children}</UserProvider>
          <ConfirmationModal />
          <ToastProvider />
        </HeroUIProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
