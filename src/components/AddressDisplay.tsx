import { Address } from '@/types/shipping'

interface AddressDisplayProps {
  address: Address
}

export function AddressDisplay({ address }: AddressDisplayProps) {
  return (
    <div className='p-3 bg-white border border-gray-200 rounded-md mb-3'>
      <p className='font-medium text-gray-800 mb-1'>Endereço de entrega:</p>
      <p className='text-gray-600'>
        {address.logradouro}
        {address.complemento && `, ${address.complemento}`}
      </p>
      <p className='text-gray-600'>
        {address.bairro} - {address.localidade}/{address.uf} - CEP:{' '}
        {address.cep}
      </p>
    </div>
  )
}
