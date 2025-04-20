import { cookies } from '@/lib/cookies'

import { Language, LanguageText, SupportedLanguage } from './types'

export interface MultiLangTextOptions {
  fallbackLang?: Language
  lang?: Language
}

export function multiLangText(texts: LanguageText, options: MultiLangTextOptions = {}) {
  const { fallbackLang = 'en', lang = cookies.get<SupportedLanguage>('preferred-language')! } = options

  if (texts[lang]) {
    return texts[lang]
  }

  return texts[fallbackLang] || Object.values(texts)[0]
}
