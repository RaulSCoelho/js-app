import { UserWithPassword } from '@js-app/shared-schemas'
import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { promises as fs } from 'fs'
import * as path from 'path'

import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'

const USERS_PATH = path.resolve(__dirname, 'users.json').replace('dist', 'src')

@Injectable()
export class UsersService {
  private async readUsers(): Promise<UserWithPassword[]> {
    const data = await fs.readFile(USERS_PATH, 'utf8')
    return JSON.parse(data)
  }

  private async writeUsers(users: UserWithPassword[]) {
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2))
  }

  private async getNextId(users: UserWithPassword[]) {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
  }

  async validateUser(username: string, password: string) {
    const users = await this.readUsers()
    const user = users.find(u => u.username === username)
    if (!user) return null

    const match = await bcrypt.compare(password, user.password)
    if (!match) return null

    return user
  }

  async register(body: RegisterDto) {
    const users = await this.readUsers()
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const newUser: UserWithPassword = {
      id: await this.getNextId(users),
      username: body.username,
      role: body.role,
      password: hashedPassword
    }

    users.push(newUser)
    await this.writeUsers(users)

    return { id: newUser.id, username: newUser.username }
  }

  async update(id: number, body: UpdateDto) {
    const users = await this.readUsers()
    const user = users.find(u => u.id === id)
    if (!user) throw new NotFoundException('User not found')

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      user.password = hashedPassword
    }

    if (body.username) {
      const existingUser = users.find(u => u.username === body.username)
      if (existingUser && existingUser.id !== id) {
        throw new NotFoundException('Username already exists')
      }
      user.username = body.username
    }

    if (body.role) {
      user.role = body.role
    }

    await this.writeUsers(users)

    return { id: user.id, username: user.username }
  }

  async remove(id: number) {
    const users = await this.readUsers()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new NotFoundException('User not found')

    users.splice(index, 1)
    await this.writeUsers(users)

    return { message: 'User deleted' }
  }
}
