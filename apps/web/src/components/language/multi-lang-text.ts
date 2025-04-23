import { cookies } from '@/lib/cookies'
import { Metadata } from 'next'

import { Language, LanguageText, SupportedLanguage, SupportedLanguageText } from './types'

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

export interface GenerateMultiLangMetadataProps extends Omit<Metadata, 'title' | 'description'> {
  title: SupportedLanguageText
  template?: string
  description?: SupportedLanguageText
}

export async function generateMultiLangMetadata({
  title,
  template,
  description,
  ...props
}: GenerateMultiLangMetadataProps) {
  const [serverCookies] = await cookies.server()
  const saved = serverCookies.get<SupportedLanguage>('preferred-language')

  const metadata: Metadata = {
    ...props,
    title: multiLangText(title, { lang: saved })
  }

  if (template) {
    metadata.title = {
      default: multiLangText(title, { lang: saved }),
      template: template
    }
  }

  if (description) metadata.description = multiLangText(description, { lang: saved })

  return metadata
}
