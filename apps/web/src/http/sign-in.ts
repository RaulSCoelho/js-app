import { LoginPayload } from '@js-app/shared-schemas'

import { api } from './api-client'

interface SignInRequest extends LoginPayload {}

interface SignInResponse {
  token: string
}

export async function signIn({ username, password }: SignInRequest) {
  const result = await api.post('auth/login', { json: { username, password } }).json<SignInResponse>()
  return result
}
