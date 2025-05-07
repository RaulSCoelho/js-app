'use client'

import { createContextualCan } from '@casl/react'
import { AppAbility } from '@js-app/auth'
import { createContext, useContext } from 'react'

export const AbilityContext = createContext<AppAbility>({} as AppAbility)
export const AbilityProvider = AbilityContext.Provider

export const useAbility = () => useContext(AbilityContext)

export const ContextualCan = createContextualCan(AbilityContext.Consumer)
export type ContextualCanProps = React.ComponentProps<typeof ContextualCan>
export type CanParams = Parameters<NonNullable<ContextualCanProps['ability']>['can']>

export type CanProps = {
  I?: CanParams[0]
  a?: CanParams[1]
}

export function Can({ children, ...can }: CanProps & { children: React.ReactNode }) {
  if (!Object.keys(can).length) return <>{children}</>
  return <ContextualCan {...(can as ContextualCanProps)}>{children}</ContextualCan>
}
