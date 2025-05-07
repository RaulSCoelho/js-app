'use client'

import { User } from '@js-app/shared-schemas'

import { Table } from '@/components/table'

export interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users = [] }: UsersTableProps) {
  return (
    <Table
      aria-label="Users table"
      items={users}
      rowKey="id"
      filterFields={['id', 'username', 'role']}
      initialVisibleColumns={['id', 'username', 'role', 'actions']}
      renderCell={(item, columnKey) => {
        switch (columnKey) {
          case 'id':
            return item.id
          case 'username':
            return item.username
          case 'role':
            return item.role
          default:
            return null
        }
      }}
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
