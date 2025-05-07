import { MaybePromise, maybePromise } from '@js-app/shared-utils'
import { useEffect, useState } from 'react'

export function useIsMounted(fn: MaybePromise = () => {}, deps: React.DependencyList = []) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    maybePromise(fn).finally(() => {
      !isMounted && setIsMounted(true)
    })
  }, deps)

  return isMounted
}
