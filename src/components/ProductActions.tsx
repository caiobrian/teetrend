'use client'

import { Product } from '@/services/product-service'
import { VariantSelectorsWrapper } from './VariantSelectorsWrapper'
import { FiShoppingCart } from 'react-icons/fi'
import { useProductVariants } from '@/hooks/useProductVariants'
import { useCart } from '@/hooks/useCart'
import { useNotification } from '@/hooks/useNotification'
import { Notification } from './Notification'

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const {
    selectedColor,
    selectedSize,
    handleColorChange,
    handleSizeChange,
    availableSizesForSelectedColor,
    colorOptions,
  } = useProductVariants({
    productImages: product.images,
    productColors: product.colors,
  })

  const { addToCart } = useCart()
  const { notification, showNotification } = useNotification()

  const handleAddToCart = () => {
    if (!product) {
      showNotification('Erro ao adicionar produto. Tente novamente.', 'error')
      return
    }

    if (!selectedColor || !selectedSize) {
      showNotification('Por favor, selecione cor e tamanho.', 'error')
      return
    }

    try {
      const message = addToCart({
        product,
        color: selectedColor,
        size: selectedSize,
      })
      showNotification(message, 'success')
    } catch (error) {
      showNotification(
        error instanceof Error
          ? error.message
          : 'Erro ao adicionar ao carrinho',
        'error',
      )
    }
  }

  return (
    <>
      <Notification notification={notification} />
      <VariantSelectorsWrapper
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorChange={handleColorChange}
        onSizeChange={handleSizeChange}
        colorOptions={colorOptions}
        availableSizesForSelectedColor={availableSizesForSelectedColor}
      />
      <div className='my-10 flex flex-col space-y-2'>
        <div className='flex flex-col sm:flex-row sm:gap-3'>
          <button
            onClick={handleAddToCart}
            className='sm:w-full flex-1 flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 py-3 px-4 text-base font-medium text-white shadow-sm transition-all hover:shadow-md'
            disabled={!selectedColor || !selectedSize}
          >
            <FiShoppingCart className='h-5 w-5 mr-2' />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </>
  )
}
