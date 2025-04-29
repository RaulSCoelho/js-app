import { RegisterPayload, User } from '@js-app/shared-schemas'

import { api } from './api-client'

interface SignUpRequest extends RegisterPayload {}

interface SignUpResponse extends User {}

export async function signUp(payload: SignUpRequest) {
  const result = await api.post('users/register', { json: payload }).json<SignUpResponse>()
  return result
}
