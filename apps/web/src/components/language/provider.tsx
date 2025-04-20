'use client'

import { useEffect, useState } from 'react'

import { cookies } from '@/lib/cookies'

import { LanguageContext } from './context'
import { SupportedLanguage } from './types'

const supportedLanguages: SupportedLanguage[] = ['en', 'es', 'fr', 'de', 'pt-BR']

function getBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'

  const browserLang = navigator.language

  if (supportedLanguages.includes(browserLang as SupportedLanguage)) {
    return browserLang as SupportedLanguage
  }

  return 'en'
}

async function getSavedLanguage(): Promise<SupportedLanguage> {
  const [serverCookies] = await cookies.server()
  const saved = serverCookies.get('preferred-language')
  return (saved as SupportedLanguage) || getBrowserLanguage()
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSavedLanguage().then(lang => {
      setLanguage(lang)
      setIsLoading(false)
    })
  }, [])

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang)
    cookies.set('preferred-language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>
      {isLoading ? null : children}
    </LanguageContext.Provider>
  )
}
