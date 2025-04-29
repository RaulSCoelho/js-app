'use server'

import { HTTPError } from 'ky'

import { signUp, SignUpRequest } from '@/http/sign-up'
import { isFieldErrorsShape } from '@/lib/is-field-errors-shape'

import { signInAction } from './sign-in'

export async function signUpAction(payload: SignUpRequest) {
  try {
    await signUp(payload)
    return await signInAction({ username: payload.username, password: payload.password })
  } catch (err: any) {
    let error = err
    if (err instanceof HTTPError) error = await error.response.json()

    if (!isFieldErrorsShape(error)) return { error: error.message }

    return { errors: error.errors }
  }
}
