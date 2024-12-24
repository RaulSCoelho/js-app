import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="mb-4 text-6xl font-semibold">404</div>
      <div className="text-xl">Ops! Esta página não pôde ser encontrada.</div>
      <p className="my-4 text-default-500">
        A página que você está procurando pode ter sido removida, alterado seu nome ou está temporariamente
        indisponível.
      </p>
      <Link
        href="/"
        className="transform rounded-md bg-gradient-to-br from-danger-600 to-danger-400 px-6 py-3 text-danger-foreground transition duration-300 ease-in-out hover:scale-105"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
