import { EffectCallback, useEffect } from 'react'

export function useFirstRenderEffect(effect: EffectCallback) {
  useEffect(effect, [])
}
