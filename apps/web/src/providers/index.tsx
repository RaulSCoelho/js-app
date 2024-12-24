'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'


export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <ThemeProvider attribute="class">
      <NextUIProvider navigate={router.push} className="flex grow flex-col">
        {children}
      </NextUIProvider>
    </ThemeProvider>
  )
}