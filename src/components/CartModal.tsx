'use client'

import { CartItem as CartItemType } from '@/types/cart'
import { FiX } from 'react-icons/fi'
import { formatCurrency } from '@/lib/utils/format'
import { useCart } from '@/hooks/useCart'
import { CartItem } from './CartItem'

interface CartModalProps {
  items: CartItemType[]
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ items, isOpen, onClose }: CartModalProps) {
  const { removeItem, calculateTotal } = useCart()

  if (!isOpen) return null

  const total = calculateTotal(items)

  return (
    <div
      className='absolute top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 flex flex-col max-h-[70vh]'
      onClick={e => e.stopPropagation()}
    >
      <div className='flex justify-between items-center p-4 border-b'>
        <h2 className='text-lg font-semibold text-gray-800'>Seu Carrinho</h2>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          <FiX size={20} />
        </button>
      </div>

      {items.length === 0 ? (
        <p className='text-gray-600 text-center py-10'>
          Seu carrinho está vazio.
        </p>
      ) : (
        <div className='overflow-y-auto flex-grow p-4 space-y-3'>
          {items.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className='p-4 border-t mt-auto'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-md font-semibold text-gray-800'>Total:</span>
            <span className='text-md font-semibold text-gray-800'>
              {formatCurrency(total)}
            </span>
          </div>
          <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md font-medium text-sm'>
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  )
}
