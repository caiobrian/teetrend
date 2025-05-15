import { HiOutlineLocationMarker } from 'react-icons/hi'
import { Address } from '@/types/shipping'
import { formatLocation } from '@/lib/utils/format'

interface LocationDisplayProps {
  address: Address
}

export function LocationDisplay({ address }: LocationDisplayProps) {
  return (
    <div className='hidden md:flex items-center space-x-1 text-sm hover:text-blue-200 cursor-pointer'>
      <HiOutlineLocationMarker className='h-5 w-5' />
      <div className='flex flex-col leading-tight'>
        <span className='text-xs text-gray-300'>Enviar para</span>
        <span className='font-medium'>{formatLocation(address)}</span>
      </div>
    </div>
  )
}
