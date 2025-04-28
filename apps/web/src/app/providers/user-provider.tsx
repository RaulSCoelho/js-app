'use client'

import { User } from '@js-app/shared-schemas'
import { createContext, ReactNode, useContext, useState } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { getUser } from '@/http/auth-get-user'

export interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()

  const isMounted = useIsMounted(async () => {
    try {
      const response = await getUser()
      setUser(response)
    } catch {}
  })

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, isAdmin: user?.role === 'ADMIN', isLoading: !isMounted }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
