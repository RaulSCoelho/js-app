'use client'

import { LanguageText, SupportedLanguage } from '@js-app/i18n'
import { useCallback, useEffect, useState } from 'react'

import { cookies } from '@/lib/cookies'

import { LanguageContext } from './context'
import { multiLangText as originalMultiLangText } from './multi-lang-text'

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

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang)
    cookies.set('preferred-language', lang)
  }, [])

  const multiLangText = useCallback(
    (texts: LanguageText) => originalMultiLangText(texts, { lang: language }),
    [language]
  )

  useEffect(() => {
    getSavedLanguage().then(lang => {
      setLanguage(lang)
      setIsLoading(false)
    })
  }, [setLanguage])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoading, multiLangText }}>
      {isLoading ? null : children}
    </LanguageContext.Provider>
  )
}
