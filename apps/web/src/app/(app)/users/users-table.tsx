'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { tv } from '@heroui/react'
import { User } from '@js-app/shared-schemas'
import { useCallback } from 'react'

import { useAbility } from '@/app/_providers/ability-provider'
import { Can } from '@/components/can'
import { useLanguage } from '@/components/language'
import { confirmationModal } from '@/components/modal'
import { Table, TableAction, TableActionWrapper, TableTopContent } from '@/components/table'
import { deleteUser } from '@/http/delete-user'

import { appUsersTableTexts } from './consts'

export const roleClass = tv({
  variants: {
    role: {
      MEMBER: 'text-primary',
      ADMIN: 'text-secondary'
    }
  }
})

export interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users = [] }: UsersTableProps) {
  const { can } = useAbility()
  const { multiLangText } = useLanguage()

  const onDelete = useCallback(
    (userId: number) => () => {
      confirmationModal({
        title: multiLangText(appUsersTableTexts.deleteTitle),
        question: multiLangText(appUsersTableTexts.deleteQuestion),
        onConfirm: async () => {
          try {
            await deleteUser(userId)
          } catch {}
        }
      })
    },
    [multiLangText]
  )

  const renderCell = useCallback(
    (user: User, columnKey: keyof User | 'actions') => {
      if (columnKey === 'actions') {
        return (
          <Can I="manage" a="User">
            <TableActionWrapper className="justify-center gap-4">
              <TableAction
                icon={TrashIcon}
                tooltip={multiLangText(appUsersTableTexts.deleteTooltip)}
                color="danger"
                onClick={onDelete(user.id)}
              />
            </TableActionWrapper>
          </Can>
        )
      }

      switch (columnKey) {
        case 'role':
          return <b className={roleClass({ role: user.role })}>{user[columnKey].toLocaleLowerCase()}</b>
        default:
          return user[columnKey]
      }
    },
    [multiLangText, onDelete]
  )

  const topContent: TableTopContent<User> = useCallback(
    ({ filterFields, columns, TableSearch, TableColumnSelector }) => (
      <div className="flex w-full flex-wrap justify-between gap-2">
        <TableSearch columns={columns} filterFields={filterFields} />
        <TableColumnSelector columns={columns} />
      </div>
    ),
    []
  )

  return (
    <Table
      aria-label={multiLangText(appUsersTableTexts.tableLabel)}
      selectionMode="none"
      items={users}
      rowKey="id"
      filterFields={['id', 'username', 'role']}
      initialVisibleColumns={['id', 'username', 'role', 'actions']}
      renderCell={renderCell}
      topContent={topContent}
      columns={[
        { uid: 'id', name: multiLangText(appUsersTableTexts.id), sortable: true },
        { uid: 'username', name: multiLangText(appUsersTableTexts.username), sortable: true },
        { uid: 'role', name: multiLangText(appUsersTableTexts.role), sortable: true },
        ...(can('manage', 'User')
          ? [{ uid: 'actions', name: multiLangText(appUsersTableTexts.actions), sortable: false }]
          : ([] as any))
      ]}
      bodyProps={{ emptyContent: multiLangText(appUsersTableTexts.emptyContent) }}
      classNames={{ wrapper: 'bg-background' }}
    />
  )
}
