import { UserWithPassword } from '@js-app/shared-schemas'
import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { promises as fs } from 'fs'
import * as path from 'path'

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

  async register(username: string, password: string) {
    const users = await this.readUsers()
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: UserWithPassword = {
      id: await this.getNextId(users),
      username,
      password: hashedPassword
    }

    users.push(newUser)
    await this.writeUsers(users)

    return { id: newUser.id, username: newUser.username }
  }

  async validateUser(username: string, password: string) {
    const users = await this.readUsers()
    const user = users.find(u => u.username === username)
    if (!user) return null

    const match = await bcrypt.compare(password, user.password)
    if (!match) return null

    return { id: user.id, username: user.username }
  }

  async updateUser(id: number, newUsername: string) {
    const users = await this.readUsers()
    const user = users.find(u => u.id === id)
    if (!user) throw new NotFoundException('User not found')

    user.username = newUsername
    await this.writeUsers(users)

    return { id: user.id, username: user.username }
  }

  async deleteUser(id: number) {
    const users = await this.readUsers()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) throw new NotFoundException('User not found')

    users.splice(index, 1)
    await this.writeUsers(users)

    return { message: 'User deleted' }
  }
}
