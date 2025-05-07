'use client'

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { tv } from '@heroui/react'
import { User } from '@js-app/shared-schemas'
import { useCallback } from 'react'

import { Can } from '@/components/can'
import { Table, TableAction, TableActionWrapper, TableTopContent } from '@/components/table'

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
  const renderCell = useCallback((user: User, columnKey: keyof User | 'actions') => {
    if (columnKey === 'actions') {
      return (
        <Can I="manage" a="User">
          <TableActionWrapper>
            <TableAction icon={PencilIcon} tooltip="Edit" className="text-primary hover:text-secondary" />
            <TableAction icon={TrashIcon} tooltip="Delete" className="text-danger hover:text-secondary" />
          </TableActionWrapper>
        </Can>
      )
    }

    switch (columnKey) {
      case 'role':
        return <b className={roleClass({ role: user.role })}>{user[columnKey]}</b>
      default:
        return user[columnKey]
    }
  }, [])

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
      aria-label="Users table"
      selectionMode="none"
      items={users}
      rowKey="id"
      filterFields={['id', 'username', 'role']}
      initialVisibleColumns={['id', 'username', 'role', 'actions']}
      renderCell={renderCell}
      topContent={topContent}
      columns={[
        { uid: 'id', name: 'ID', sortable: true },
        { uid: 'username', name: 'Username', sortable: true },
        { uid: 'role', name: 'Role', sortable: true },
        { uid: 'actions', name: 'Actions', sortable: false }
      ]}
      bodyProps={{ emptyContent: 'No users found' }}
      classNames={{ wrapper: 'bg-background' }}
    />
  )
}
