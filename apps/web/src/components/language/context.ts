import { createContext } from 'react'

import { SupportedLanguage } from './types'

export interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  isLoading: boolean
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isLoading: true
})
