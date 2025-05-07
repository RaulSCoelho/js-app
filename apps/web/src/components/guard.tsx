'use client'

import { AppAbility } from '@js-app/auth'
import { redirect } from 'next/navigation'

import { useAbility } from '@/app/_providers/ability-provider'

export interface GuardProps {
  children: React.ReactNode
  can?: Parameters<AppAbility['can']>
  cannot?: Parameters<AppAbility['cannot']>
  redirectTo?: string
}

export function Guard({ children, can: canProps, cannot: cannotProps, redirectTo = '/' }: GuardProps) {
  const { can, cannot } = useAbility()
  const isAllowed = (!canProps || can(...canProps)) && (!cannotProps || !cannot(...cannotProps))

  if (!isAllowed) {
    return redirect(redirectTo)
  }

  return <>{children}</>
}
