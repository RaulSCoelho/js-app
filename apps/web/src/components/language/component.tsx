'use client'

import { multiLangText } from './multi-lang-text'
import { Language, LanguageText } from './types'
import { useLanguage } from './use-language'

export interface MultiLangTextProps {
  texts: LanguageText
  fallbackLang?: Language
}

export function MultiLangText({ texts, fallbackLang }: MultiLangTextProps) {
  const { language } = useLanguage()

  return multiLangText(texts, { fallbackLang, lang: language })
}
