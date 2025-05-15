import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-[calc(100vh-200px)] flex flex-col justify-center items-center'>
      <main className='container mx-auto px-4 py-24 text-center'>
        <h1 className='text-4xl font-bold mb-4'>404 - Página não encontrada</h1>
        <p className='text-gray-600 mb-8'>
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link
          href='/'
          className='inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors'
        >
          Voltar para a página inicial
        </Link>
      </main>
    </div>
  )
}
