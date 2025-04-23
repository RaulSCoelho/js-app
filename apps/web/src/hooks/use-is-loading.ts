import { useState } from 'react'

import { FromPromise } from '@js-app/shared-utils'

export function useIsLoading<T extends any[], R>(fn: (...args: T) => R) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleFn(...args: Parameters<typeof fn>) {
    const res = fn(...args)

    if (res instanceof Promise) {
      setIsLoading(true)
      await res
      setIsLoading(false)
    }

    return res as FromPromise<R>
  }

  return [handleFn, isLoading] as const
}
