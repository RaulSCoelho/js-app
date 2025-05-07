'use client'

import { Skeleton } from '@heroui/react'

export default function Loading() {
  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-6 text-2xl font-bold">Users</h1>
      <div className="rounded-large bg-background p-4 shadow-medium">
        <Skeleton className="h-8 w-full rounded-medium" />
        <Skeleton className="mt-2 h-8 w-full rounded-medium" />
        <Skeleton className="mt-2 h-8 w-full rounded-medium" />
        <Skeleton className="mt-2 h-8 w-full rounded-medium" />
        <Skeleton className="mt-2 h-8 w-full rounded-medium" />
        <Skeleton className="mt-2 h-8 w-full rounded-medium" />
      </div>
      <Skeleton className="mx-auto mt-4 h-9 w-28 rounded-medium" />
    </div>
  )
}
