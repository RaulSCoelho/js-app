'use client'

import { LanguageText, SupportedLanguage } from '@js-app/i18n'
import { createContext } from 'react'

export interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  isLoading: boolean
  multiLangText: (texts: LanguageText) => string
}

export const LanguageContext = createContext({} as LanguageContextType)
