import { getUserPermissions } from '@js-app/auth'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'

import { CASL, RequiredRule } from '@/decorators/casl'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.getAllAndOverride<RequiredRule[]>(CASL, [context.getHandler(), context.getClass()]) ?? []

    if (rules.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const user = request.user

    if (!request.user) {
      return false
    }

    const ability = getUserPermissions(user.id, user.role)

    if (rules.every(rule => ability.can(rule.action, rule.subject as any))) {
      return true
    }

    const message =
      rules.find(rule => rule.message)?.message ??
      `You are not authorized to ${rules.map(rule => `${rule.action} ${rule.subject.toString().toLowerCase()}`).join(', ')}`

    throw new UnauthorizedException(message)
  }
}
