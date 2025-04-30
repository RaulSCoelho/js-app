import { Language, LanguageText } from './types'

export interface MultiLangTextOptions {
  fallbackLang?: Language
  lang?: Language
}

export function multiLangText(texts: LanguageText, options: MultiLangTextOptions = {}) {
  const { fallbackLang = 'en', lang = fallbackLang } = options
  return texts[lang] || Object.values(texts)[0]
}
