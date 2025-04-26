import { RegisterSchema } from '@js-app/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/lib/zod/create-zod-dto'

export class RegisterDto extends createZodDto(RegisterSchema) {}
export interface RegisterDto extends z.infer<typeof RegisterSchema> {}
