'use client'

import { RatingStars } from './RatingStars'
import { ProductPrice } from './ProductPrice'

interface ProductHeaderProps {
  title: string
  rating: number
  reviewCount: number
  price: number
  discountPrice?: number
}

export function ProductHeader({
  title,
  rating,
  reviewCount,
  price,
  discountPrice,
}: ProductHeaderProps) {
  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>{title}</h1>

      <div className='mt-1 flex items-center gap-2'>
        <RatingStars rating={rating} />
        <p className='text-sm text-gray-500'>
          {rating.toFixed(1)} ({reviewCount} avaliações)
        </p>
      </div>

      <div className='mt-4'>
        <ProductPrice price={price} discountPrice={discountPrice} />
      </div>
    </div>
  )
}
