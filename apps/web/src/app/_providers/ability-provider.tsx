'use client'

import { AbilityProvider as CaslAbilityProvider } from '@/components/casl'

import { useUser } from './user-provider'

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { ability } = useUser()

  return <CaslAbilityProvider value={ability}>{children}</CaslAbilityProvider>
}
