'use client'

import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string; code?: number }
  reset: () => void
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex grow flex-col items-center justify-center space-y-6 px-4 py-16 md:px-8">
      <div className="space-y-2 text-center">
        <p className="text-xl font-semibold tracking-[0.35px] text-primary-600">{error.cause as string}</p>
        <p className="text-base text-default-500">{error.message}</p>
      </div>
      <Link
        href="/"
        className="transform rounded-md bg-gradient-to-br from-danger-600 to-danger-400 px-6 py-3 text-danger-foreground transition duration-300 ease-in-out hover:scale-105"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}