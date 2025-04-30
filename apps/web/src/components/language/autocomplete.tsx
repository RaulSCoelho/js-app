'use client'

import { SupportedLanguage } from '@js-app/i18n'

import { Autocomplete } from '../autocomplete'
import { languages } from './consts'
import { useLanguage } from './use-language'

const languageSelectTexts = {
  label: {
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
    de: 'Sprache',
    'pt-BR': 'Idioma'
  },
  placeholder: {
    en: 'Select language',
    es: 'Selecciona el idioma',
    fr: 'Sélectionnez la langue',
    de: 'Sprache wählen',
    'pt-BR': 'Selecione o idioma'
  }
}

export function LanguageAutocomplete() {
  const { language, setLanguage, multiLangText } = useLanguage()

  return (
    <Autocomplete
      label={multiLangText(languageSelectTexts.label)}
      placeholder={multiLangText(languageSelectTexts.placeholder)}
      className="max-w-xs"
      items={languages}
      valueKey="code"
      labelKey="name"
      selectedKey={language}
      onSelectionChange={key => setLanguage(key as SupportedLanguage)}
      isClearable={false}
    />
  )
}
