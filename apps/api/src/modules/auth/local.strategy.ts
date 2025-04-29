import { User } from '@js-app/shared-schemas'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        errors: { username: ['Invalid credentials'], password: ['Invalid credentials'] }
      })
    }
    return user
  }
}
