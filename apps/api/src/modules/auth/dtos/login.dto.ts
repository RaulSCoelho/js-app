import { LoginSchema } from '@js-app/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/lib/zod/create-zod-dto'

export class LoginDto extends createZodDto(LoginSchema) {}
export interface LoginDto extends z.infer<typeof LoginSchema> {}
