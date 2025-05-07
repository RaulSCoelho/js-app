import { generateMultiLangMetadata } from '@/lib/i18n'

import { usersMetadataTexts } from './consts'

export function generateMetadata() {
  return generateMultiLangMetadata(usersMetadataTexts)
}

export default function Page() {
  return (
    <div>
      <h1>Manage Users</h1>
    </div>
  )
}
