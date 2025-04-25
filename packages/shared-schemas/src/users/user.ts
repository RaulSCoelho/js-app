import { string } from '@js-app/shared-utils'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().int(),
  username: string({ name: 'Username', min: 1 })
})

export const userSchemaWithPassword = userSchema.extend({
  password: string({ name: 'Password', min: 1 })
})

export type User = z.infer<typeof userSchema>
export type UserWithPassword = z.infer<typeof userSchemaWithPassword>
