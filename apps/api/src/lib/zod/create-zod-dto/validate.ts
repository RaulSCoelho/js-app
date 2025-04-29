import { BadRequestException } from '@nestjs/common'
import { ZodType } from 'zod'

export function validate<T extends ZodType<any, any>>(schema: T, data: any): T['_output'] {
  const result = schema.safeParse(data)

  if (!result.success) {
    // Map errors into a user-friendly format.
    const { fieldErrors: errors } = result.error.flatten()
    throw new BadRequestException({ message: 'Validation failed', errors })
  }

  return result.data
}
