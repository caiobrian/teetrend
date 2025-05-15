export function Footer() {
  return (
    <footer className='bg-blue-900 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>TeeTrend</h3>
            <p className='text-gray-300 text-sm'>
              A sua loja online de roupas e acessórios com os melhores preços e
              qualidade.
            </p>
          </div>
        </div>

        <div className='border-t border-blue-800 mt-8 pt-6 text-sm text-gray-300'>
          <p>© 2025 TeeTrend. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
