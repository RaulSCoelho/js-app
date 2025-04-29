'use client'

import { User } from '@js-app/shared-schemas'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { getUser } from '@/http/auth-get-user'
import { signIn } from '@/http/sign-in'
import { signUp } from '@/http/sign-up'
import { cookies } from '@/lib/cookies'

export interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: typeof signIn
  signUp: typeof signUp
  signOut: () => Promise<void>
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

  const handleSignIn: typeof signIn = useCallback(async payload => {
    const response = await signIn(payload)
    cookies.set('token', response.token)
    const userResponse = await getUser()
    setUser(userResponse)
    return response
  }, [])

  const handleSignUp: typeof signUp = useCallback(async payload => {
    const user = await signUp(payload)
    await handleSignIn({ username: user.username, password: payload.password })
    return user
  }, [])

  const handleSignOut = useCallback(async () => {
    cookies.delete('token')
    setUser(undefined)
  }, [])

  return (
    <UserContext.Provider
      value={
        {
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === 'ADMIN',
          isLoading: !isMounted,
          signIn: handleSignIn,
          signUp: handleSignUp,
          signOut: handleSignOut
        } as UserContextProps
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
