import { User } from '@js-app/shared-schemas'

import { Guard } from '@/components/guard'
import { MultiLangText } from '@/components/language'
import { getUsers } from '@/http/get-users'
import { generateMultiLangMetadata } from '@/lib/i18n'

import { usersMetadataTexts, usersPageTexts } from './consts'
import { UsersTable } from './users-table'

export function generateMetadata() {
  return generateMultiLangMetadata(usersMetadataTexts)
}

export default async function Page() {
  let users: User[] = []
  try {
    users = await getUsers()
  } catch (error) {}

  return (
    <Guard can={['get', 'User']}>
      <div className="flex flex-col p-4">
        <h1 className="mb-10 text-2xl font-bold">
          <MultiLangText texts={usersPageTexts.title} />
        </h1>
        <UsersTable users={users} />
      </div>
    </Guard>
  )
}
