import { string } from '@js-app/shared-utils'
import { z } from 'zod'

export const RegisterSchema = z.object({
  username: string({ name: 'Username', min: 1 }),
  password: string({ name: 'Password', min: 1 })
})
RegisterSchema._def.name = 'RegisterSchema'
