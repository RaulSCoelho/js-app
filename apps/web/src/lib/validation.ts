import { validationsMessages } from '@js-app/shared-schemas'

import { multiLangText } from './i18n'

export function getValidationError(error: string): string {
  return error in validationsMessages
    ? multiLangText(validationsMessages[error as keyof typeof validationsMessages])
    : error
}
