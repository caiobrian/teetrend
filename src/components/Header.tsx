'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useAddress } from '@/hooks/useAddress'
import { LocationDisplay } from './LocationDisplay'
import { CartButton } from './CartButton'

export function Header() {
  const { savedAddress } = useAddress()
  const { items, itemCount, loadCartData } = useCart()
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  const toggleCartModal = () => {
    if (!isCartModalOpen) {
      loadCartData()
    }
    setIsCartModalOpen(!isCartModalOpen)
  }

  return (
    <header>
      <div className='bg-blue-900 text-white py-6'>
        <div className='container mx-auto px-4 py-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link href='/' className='flex items-center space-x-2'>
                <span className='text-2xl font-bold'>TeeTrend</span>
              </Link>

              {savedAddress && <LocationDisplay address={savedAddress} />}
            </div>

            <div className='flex items-center space-x-6'>
              <CartButton
                itemCount={itemCount}
                items={items}
                isModalOpen={isCartModalOpen}
                onToggleModal={toggleCartModal}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
