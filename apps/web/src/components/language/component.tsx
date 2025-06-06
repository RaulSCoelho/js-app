'use client'

import { LanguageText } from '@js-app/i18n'

import { useLanguage } from './context'

export interface MultiLangTextProps {
  texts: LanguageText
}

export function MultiLangText({ texts }: MultiLangTextProps) {
  const { multiLangText } = useLanguage()
  return multiLangText(texts)
}
