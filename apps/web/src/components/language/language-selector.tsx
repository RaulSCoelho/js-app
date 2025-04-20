'use client'

import { SupportedLanguage } from './types'
import { useLanguage } from './use-language'

const languages: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  'pt-BR': 'Português (BR)'
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <select
      value={language}
      onChange={e => setLanguage(e.target.value as SupportedLanguage)}
      className="rounded-md border border-default-200 px-2 py-1 text-small"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  )
}
