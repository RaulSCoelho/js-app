import { AppAbility } from '@js-app/auth'
import { SetMetadata } from '@nestjs/common'

export interface RequiredRule {
  action: Parameters<AppAbility['can']>[0]
  subject: Parameters<AppAbility['can']>[1]
  message?: string
}

export const CASL = 'casl'
export const Casl = (...requirements: RequiredRule[]) => SetMetadata(CASL, requirements)
