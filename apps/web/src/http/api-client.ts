import { env } from '@js-app/env'
import ky from 'ky'

import { cookies } from '@/lib/cookies'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async request => {
        const [serverCookies] = await cookies.server()
        const token = serverCookies.get('token')
        const lang = serverCookies.get('preferred-language')

        if (lang) {
          request.headers.set('x-language', lang)
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    ]
  }
})
