'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { forwardRef } from 'react'

import { Input, InputProps } from '.'

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(function SearchInput(
  { type = 'text', placeholder = 'Buscar...', startContent, ...props },
  ref
) {
  return (
    <Input
      ref={ref}
      type={type}
      placeholder={placeholder}
      startContent={startContent || <MagnifyingGlassIcon className="shrink-0" width={18} height={18} />}
      {...props}
    />
  )
})
