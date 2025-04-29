'use client'

import { User } from '@js-app/shared-schemas'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { signInAction } from '@/actions/sign-in'
import { signOutAction } from '@/actions/sign-out'
import { signUpAction } from '@/actions/sign-up'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { getUser } from '@/http/auth-get-user'
import { SignInRequest } from '@/http/sign-in'
import { SignUpRequest } from '@/http/sign-up'
import { FieldErrorsShape } from '@/lib/is-field-errors-shape'

export interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: (
    payload: SignInRequest
  ) => Promise<{ user: User; errors: undefined } | (FieldErrorsShape & { user: undefined })>
  signUp: (
    payload: SignUpRequest
  ) => Promise<{ user: User; errors: undefined } | (FieldErrorsShape & { user: undefined })>
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

  const handleSignIn = useCallback(async (payload: SignInRequest) => {
    const response = await signInAction(payload)
    if (response.user) {
      setUser(response.user)
      return { user: response.user }
    }
    return { errors: response.errors }
  }, [])

  const handleSignUp = useCallback(async (payload: SignUpRequest) => {
    const response = await signUpAction(payload)
    if (response.user) {
      setUser(response.user)
      return { user: response.user }
    }
    return { errors: response.errors }
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOutAction()
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
