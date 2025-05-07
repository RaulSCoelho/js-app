'use client'

import { getUserPermissions } from '@js-app/auth'

import { AbilityProvider as CaslAbilityProvider } from '@/components/casl'

import { useUser } from './user-provider'

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const ability = getUserPermissions(user?.id ?? 0, user?.role ?? 'ANONYMOUS')

  return <CaslAbilityProvider value={ability}>{children}</CaslAbilityProvider>
}
