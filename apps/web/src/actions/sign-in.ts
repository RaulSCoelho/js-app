'use server'

import { HTTPError } from 'ky'

import { getUser } from '@/http/auth-get-user'
import { signIn, SignInRequest } from '@/http/sign-in'
import { cookies } from '@/lib/cookies'
import { isFieldErrorsShape } from '@/lib/is-field-errors-shape'

export async function signInAction({ username, password }: SignInRequest) {
  try {
    const result = await signIn({ username, password })
    const [serverCookies] = await cookies.server()
    serverCookies.set('token', result.token)
    const user = await getUser()
    return { user }
  } catch (err: any) {
    let error = err
    if (err instanceof HTTPError) error = await error.response.json()

    if (!isFieldErrorsShape(error)) return { error: error.message }

    return { errors: error.errors }
  }
}
