import { UserWithPassword } from '@js-app/shared-schemas'
import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { getNextUserId, getUserById, getUsers, saveUsers } from '@/db'

import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'

@Injectable()
export class UsersService {
  async validateUser(username: string, password: string) {
    const users = await getUsers()
    const user = users.find(u => u.username === username)
    if (!user) return null

    const match = await bcrypt.compare(password, user.password)
    if (!match) return null

    return user
  }

  async findAll() {
    const users = await getUsers()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user)
  }

  async findOne(id: number) {
    return await getUserById(id)
  }

  async register(body: RegisterDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const newUser: UserWithPassword = {
      id: await getNextUserId(),
      username: body.username,
      role: body.role,
      password: hashedPassword
    }

    const users = await getUsers()
    users.push(newUser)
    await saveUsers(users)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }

  async update(id: number, body: UpdateDto) {
    const users = await getUsers()
    const user = users.find(u => u.id === id)
    if (!user) throw new NotFoundException('User not found')

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      body.password = hashedPassword
    }

    if (body.username) {
      const existingUser = users.find(u => u.username === body.username)
      if (existingUser && existingUser.id !== id) {
        throw new NotFoundException('Username already exists')
      }
    }

    Object.assign(user, body)
    await saveUsers(users)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async remove(id: number) {
    const users = await getUsers()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new NotFoundException('User not found')

    users.splice(index, 1)
    await saveUsers(users)

    return { message: 'User deleted' }
  }
}
