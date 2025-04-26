import { registerSchema } from '@js-app/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/lib/zod/create-zod-dto'

export class RegisterDto extends createZodDto(registerSchema) {}
export interface RegisterDto extends z.infer<typeof registerSchema> {}
