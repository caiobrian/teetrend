import { formatCurrency } from '@/lib/utils/format'

interface ProductPriceProps {
  price: number
  discountPrice?: number
}

export function ProductPrice({ price, discountPrice }: ProductPriceProps) {
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0

  return (
    <div className='flex items-end'>
      {discountPrice ? (
        <>
          <p className='text-3xl font-bold text-gray-900'>
            {formatCurrency(discountPrice)}
          </p>
          <p className='ml-2 text-sm text-gray-500 line-through'>
            {formatCurrency(price)}
          </p>
          <span className='ml-2 rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'>
            -{discountPercentage}%
          </span>
        </>
      ) : (
        <p className='text-3xl font-bold text-gray-900'>
          {formatCurrency(price)}
        </p>
      )}
    </div>
  )
}
