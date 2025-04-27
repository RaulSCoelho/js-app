import { UserWithPassword } from '@js-app/shared-schemas'
import { NotFoundException } from '@nestjs/common'
import { promises as fs } from 'fs'
import * as path from 'path'

const USERS_PATH = path.resolve(__dirname, 'users.json').replace('dist', 'src')

export async function getUsers(): Promise<UserWithPassword[]> {
  const data = await fs.readFile(USERS_PATH, 'utf8')
  return JSON.parse(data)
}

export async function saveUsers(users: UserWithPassword[]) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2))
}

export async function getNextUserId() {
  const users = await getUsers()
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
}

export async function getUserById(id: number) {
  const users = await getUsers()
  const user = users.find(u => u.id === id)
  if (!user) throw new NotFoundException('User not found')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
