import { User } from '@js-app/shared-schemas'

declare module 'fastify' {
  interface FastifyRequest {
    user: User
  }
}
