'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { getProductImagesByColor } from '@/lib/utils/product'
import { ProductColor, Product } from '@/services/product-service'

interface ProductImageFromService {
  id: string
  url: string
  alt: string
}

interface ProductImageProps {
  productImages: Product['images']
  productColors: ProductColor[]
  productId: string
}

export function ProductImage({
  productImages,
  productColors,
  productId,
}: ProductImageProps) {
  const searchParams = useSearchParams()
  const selectedColorValue = searchParams.get('color')

  const [currentImages, setCurrentImages] = useState<ProductImageFromService[]>(
    [],
  )
  const [selectedImage, setSelectedImage] =
    useState<ProductImageFromService | null>(null)

  useEffect(() => {
    let imagesToDisplay: ProductImageFromService[] = []

    const partialProduct = {
      images: productImages,
      colors: productColors,
    } as Pick<Product, 'images' | 'colors'>

    if (selectedColorValue) {
      imagesToDisplay = getProductImagesByColor(
        partialProduct as Product,
        selectedColorValue,
      )
    } else {
      imagesToDisplay = getProductImagesByColor(partialProduct as Product, '')
    }

    setCurrentImages(imagesToDisplay)
    if (imagesToDisplay.length > 0) {
      setSelectedImage(imagesToDisplay[0])
    } else {
      const firstAvailableColor = productColors.find(
        c => c.available && productImages[c.value]?.length > 0,
      )
      if (firstAvailableColor) {
        imagesToDisplay = getProductImagesByColor(
          partialProduct as Product,
          firstAvailableColor.value,
        )
        setCurrentImages(imagesToDisplay)
        if (imagesToDisplay.length > 0) setSelectedImage(imagesToDisplay[0])
        else setSelectedImage(null)
      } else {
        const anyImagesKey = Object.keys(productImages)[0]
        if (anyImagesKey && productImages[anyImagesKey]?.length > 0) {
          imagesToDisplay = productImages[anyImagesKey]
          setCurrentImages(imagesToDisplay)
          setSelectedImage(imagesToDisplay[0])
        } else {
          setSelectedImage(null)
        }
      }
    }
  }, [selectedColorValue, productImages, productColors, productId])

  if (!selectedImage)
    return (
      <div className='relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center'>
        <p>Sem imagem disponível</p>
      </div>
    )

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100'>
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          className='object-cover'
          fill
          priority
        />
      </div>

      <div className='flex gap-2 mt-2 overflow-x-auto'>
        {currentImages.map(image => (
          <button
            key={image.id}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ${
              image.id === selectedImage.id
                ? 'ring-2 ring-blue-500'
                : 'ring-1 ring-gray-200'
            }`}
            onClick={() => setSelectedImage(image)}
            onMouseEnter={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              className='object-cover'
              fill
              sizes='(max-width: 768px) 10vw, 5vw'
            />
          </button>
        ))}
      </div>
    </div>
  )
}
