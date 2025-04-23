'use client'

import { createContext } from 'react'

import { LanguageText, SupportedLanguage } from './types'

export interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  isLoading: boolean
  multiLangText: (texts: LanguageText) => string
}

export const LanguageContext = createContext({} as LanguageContextType)
