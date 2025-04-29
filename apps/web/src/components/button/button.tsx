'use client'

import { Button as NextUIButton, ButtonProps as NextUIButtonProps } from '@heroui/react'
import { forwardRef } from 'react'

export type ButtonProps = NextUIButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = 'button', color = 'primary', ...rest },
  ref
) {
  return <NextUIButton ref={ref} type={type} color={color} {...rest} />
})
