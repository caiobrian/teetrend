'use client'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import { AiOutlineInfoCircle, AiOutlineExclamationCircle } from 'react-icons/ai'
import { useShippingCalculator } from '@/hooks/useShippingCalculator'
import { SHIPPING_METHODS } from '@/lib/constants/shipping'
import { CEP_SEARCH_URL } from '@/lib/constants/cep'
import { ShippingMethodCard } from './ShippingMethodCard'
import { AddressDisplay } from './AddressDisplay'
export function ShippingCalculator() {
  const {
    cep,
    address,
    loading,
    error,
    handleCepChange,
    fetchAddressManually,
  } = useShippingCalculator()

  return (
    <div className='mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50'>
      <div className='flex items-center mb-2'>
        <HiOutlineLocationMarker className='h-5 w-5 text-blue-600 mr-2' />
        <h3 className='text-lg font-medium text-gray-900'>
          Calcular Frete e Prazo de Entrega
        </h3>
      </div>

      <div className='flex flex-col sm:flex-row gap-2'>
        <div className='relative flex-1'>
          <input
            type='text'
            placeholder='Digite seu CEP'
            value={cep}
            onChange={handleCepChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900'
            maxLength={9}
          />
          {loading && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
              <div className='animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent' />
            </div>
          )}
        </div>

        <button
          className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md'
          onClick={fetchAddressManually}
          disabled={loading}
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>

      {!address && !loading && !error && (
        <div className='mt-2 flex justify-between text-sm'>
          <a
            href={CEP_SEARCH_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            Não sei meu CEP
          </a>

          <span className='text-gray-500'>
            <AiOutlineInfoCircle className='h-4 w-4 inline mr-1' />
            Digite o CEP para calcular o frete
          </span>
        </div>
      )}

      {error && (
        <div className='mt-2 p-2 bg-red-50 border border-red-200 rounded-md'>
          <p className='text-sm text-red-600 flex items-center'>
            <AiOutlineExclamationCircle className='h-4 w-4 mr-1' />
            {error}
          </p>
        </div>
      )}

      {address && (
        <div className='mt-3'>
          <AddressDisplay address={address} />

          <div className='space-y-2'>
            {SHIPPING_METHODS.map(method => (
              <ShippingMethodCard
                key={method.id}
                title={method.title}
                deliveryTime={method.deliveryTime}
                price={method.price}
                icon={method.icon}
                theme={method.theme}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
