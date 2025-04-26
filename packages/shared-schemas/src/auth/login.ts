import { string } from '@js-app/shared-utils'
import { z } from 'zod'

export const LoginSchema = z.object({
  username: string({ name: 'Username', min: 1 }),
  password: string({ name: 'Password', min: 1 })
})
LoginSchema._def.name = 'LoginSchema'
