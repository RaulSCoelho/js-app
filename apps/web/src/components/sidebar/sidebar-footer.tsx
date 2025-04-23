'use client'

import { forwardRef } from 'react'

import { tv } from '@heroui/react'

const sidebarFooter = tv({
  base: 'flex w-full p-2.5 pt-0'
})

export const SidebarFooter = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function SidebarFooter(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={sidebarFooter({ className })} {...props} />
})
