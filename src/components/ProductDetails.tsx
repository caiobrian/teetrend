import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { BsCreditCard2Front } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'

interface ProductDetailsProps {
  composition?: string
  features?: string[]
  productId: string
}

export function ProductDetails({
  composition,
  features,
  productId,
}: ProductDetailsProps) {
  return (
    <div className='mt-8 border-t border-gray-200 pt-6'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>
        Detalhes do produto
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-3'>
          {composition && (
            <p className='text-sm text-gray-600'>
              <span className='font-medium text-gray-700'>Composição:</span>{' '}
              {composition}
            </p>
          )}

          {features && features.length > 0 && (
            <div className='text-sm text-gray-600'>
              <span className='font-medium text-gray-700'>
                Características:
              </span>
              <ul className='mt-2 list-disc pl-5 space-y-1'>
                {features.map((feature: string) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <IoShieldCheckmarkOutline className='h-5 w-5 text-gray-500' />
            <span className='text-sm text-gray-500'>
              Garantia: 30 dias contra defeitos de fabricação
            </span>
          </div>

          <div className='flex items-center space-x-2'>
            <BsCreditCard2Front className='h-5 w-5 text-gray-500' />
            <span className='text-sm text-gray-500'>
              Pagamento: Até 12x sem juros
            </span>
          </div>

          <div className='flex items-center space-x-2'>
            <FiShoppingBag className='h-5 w-5 text-gray-500' />
            <span className='text-sm text-gray-500'>
              Código do produto: {productId.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
