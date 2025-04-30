'use client'

import { Language, LanguageText } from '@js-app/i18n'

import { multiLangText } from './multi-lang-text'
import { useLanguage } from './use-language'

export interface MultiLangTextProps {
  texts: LanguageText
  fallbackLang?: Language
}

export function MultiLangText({ texts, fallbackLang }: MultiLangTextProps) {
  const { language } = useLanguage()

  return multiLangText(texts, { fallbackLang, lang: language })
}
