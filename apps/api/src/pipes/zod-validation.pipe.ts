import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

import { validate } from '@/lib/zod'

export class ZodValidationPipe implements PipeTransform {
  // Optionally, a schema can be passed in the constructor.
  constructor(private schema?: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    let schemaToUse: ZodSchema | undefined = this.schema

    // If no schema was provided in the constructor, check if the metatype has a static schema.
    if (!schemaToUse && metadata.metatype && (metadata.metatype as any).schema) {
      schemaToUse = (metadata.metatype as any).schema
    }

    // If still no schema, bypass transformation.
    if (!schemaToUse) {
      return value
    }

    return validate(schemaToUse, value)
  }
}
