import { api } from './api-client'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

export async function signIn({ email, password }: SignInRequest) {
  const result = await api.post('auth/login', { json: { email, password } }).json<SignInResponse>()
  return result
}
