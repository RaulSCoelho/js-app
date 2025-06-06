import { User } from '@js-app/shared-schemas'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { JwtPayload } from './jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    return await this.usersService.validateUser(username, password)
  }

  async login(user: User) {
    const payload: JwtPayload = { id: user.id, username: user.username }
    return { token: this.jwtService.sign(payload) }
  }
}
