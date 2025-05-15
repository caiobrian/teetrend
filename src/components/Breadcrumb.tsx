import Link from 'next/link'

interface BreadcrumbProps {
  category: string
  productTitle: string
}

export function Breadcrumb({ category, productTitle }: BreadcrumbProps) {
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className='container mx-auto px-4 py-2 text-sm text-gray-500'>
      <div className='flex items-center space-x-2 mt-2'>
        <Link href='/' className='hover:text-blue-600 hover:underline'>
          Início
        </Link>
        <span>&gt;</span>
        <Link
          href={`/${category}`}
          className='hover:text-blue-600 hover:underline'
        >
          {formattedCategory}
        </Link>
        <span>&gt;</span>
        <span className='text-gray-700'>{productTitle}</span>
      </div>
    </div>
  )
}
