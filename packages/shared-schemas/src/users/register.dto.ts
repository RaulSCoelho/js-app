import { string } from '@js-app/shared-utils'
import { z } from 'zod'

import { createZodDto } from '../create-zod-dto'

export const RegisterSchema = z.object({
  username: string({ name: 'Username', min: 1 }),
  password: string({ name: 'Password', min: 1 })
})
RegisterSchema._def.name = 'RegisterSchema'

export class RegisterDto extends createZodDto(RegisterSchema) {}
export interface RegisterDto extends z.infer<typeof RegisterSchema> {}
