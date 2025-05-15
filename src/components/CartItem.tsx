import { CartItem as CartItemType } from '@/types/cart'
import Image from 'next/image'
import { FiX } from 'react-icons/fi'
import { formatCurrency } from '@/lib/utils/format'

interface CartItemProps {
  item: CartItemType
  onRemove: (id: string) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className='flex items-start py-2'>
      <div className='relative w-14 h-14 mr-3 rounded overflow-hidden border border-gray-100'>
        <Image
          src={item.imageUrl || '/images/placeholder.jpg'}
          alt={item.title}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='flex-grow'>
        <h3 className='font-medium text-gray-800 text-sm leading-tight'>
          {item.title}
        </h3>
        <p className='text-xs text-gray-500'>
          Cor: {item.color}, Tamanho: {item.size}
        </p>
        <p className='text-xs text-gray-500'>Qtd: {item.quantity}</p>
      </div>
      <div className='text-right ml-2 flex-shrink-0 w-20'>
        <p className='font-semibold text-gray-800 text-sm'>
          {formatCurrency(item.price * item.quantity)}
        </p>
        {item.quantity > 1 && (
          <p className='text-xs text-gray-400'>
            ({formatCurrency(item.price)} cada)
          </p>
        )}
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className='ml-2 text-red-500 hover:text-red-700 p-1'
        title='Remover item'
      >
        <FiX size={16} />
      </button>
    </div>
  )
}
