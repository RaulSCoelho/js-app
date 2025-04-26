import { roleSchema } from '@js-app/auth'
import { z } from 'zod'

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Username must be at least 3 characters long.' })
  .max(30, { message: 'Username must be at most 30 characters long.' })
  .regex(/^[a-zA-Z0-9._]+$/, {
    message: 'Username can only contain letters, numbers, periods, and underscores.'
  })
  .regex(/^(?!.*[.]{2,}).*$/, {
    message: 'Username cannot contain consecutive periods.'
  })
  .regex(/^(?!.*[_]{2,}).*$/, {
    message: 'Username cannot contain consecutive underscores.'
  })
  .regex(/^(?![._]).*$/, {
    message: 'Username cannot start with a period or underscore.'
  })
  .regex(/.*(?<![._])$/, {
    message: 'Username cannot end with a period or underscore.'
  })

export const userSchema = z.object({
  id: z.number().int(),
  username: usernameSchema,
  role: roleSchema
})

export const passwordSchema = z.string().trim().min(8, { message: 'Password must be at least 8 characters long.' })

export const userSchemaWithPassword = userSchema.extend({
  password: passwordSchema
})

export type User = z.infer<typeof userSchema>
export type UserWithPassword = z.infer<typeof userSchemaWithPassword>
