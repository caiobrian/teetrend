import { FiShoppingBag } from 'react-icons/fi'
import { CartModal } from './CartModal'
import { CartItem } from '@/types/cart'

interface CartButtonProps {
  itemCount: number
  items: CartItem[]
  isModalOpen: boolean
  onToggleModal: () => void
}

export function CartButton({
  itemCount,
  items,
  isModalOpen,
  onToggleModal,
}: CartButtonProps) {
  return (
    <div
      className='relative flex items-center hover:text-blue-200 cursor-pointer'
      onClick={onToggleModal}
    >
      <div className='relative'>
        {itemCount > 0 && (
          <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold'>
            {itemCount}
          </span>
        )}
        <FiShoppingBag className='h-7 w-7' />
      </div>
      <span className='ml-1 font-medium'>Carrinho</span>
      <CartModal items={items} isOpen={isModalOpen} onClose={onToggleModal} />
    </div>
  )
}
