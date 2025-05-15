import { BiCheckCircle } from 'react-icons/bi'
import { RiFlashlightFill } from 'react-icons/ri'
import { formatCurrency } from '@/lib/utils/format'

interface ShippingMethodCardProps {
  title: string
  deliveryTime: string
  price: number
  icon: 'check' | 'flash'
  theme: 'green' | 'blue'
}

const ICONS = {
  check: BiCheckCircle,
  flash: RiFlashlightFill,
}

const THEMES = {
  green: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: 'text-green-600',
  },
  blue: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: 'text-blue-600',
  },
}

export function ShippingMethodCard({
  title,
  deliveryTime,
  price,
  icon,
  theme,
}: ShippingMethodCardProps) {
  const Icon = ICONS[icon]
  const themeClasses = THEMES[theme]

  return (
    <div
      className={`flex items-start p-2 border ${themeClasses.border} ${themeClasses.bg} rounded-md`}
    >
      <div className='mt-0.5'>
        <Icon className={`h-5 w-5 ${themeClasses.icon} mr-2`} />
      </div>
      <div>
        <p className={`${themeClasses.text} font-medium`}>{title}</p>
        <p className='text-sm text-gray-600'>
          Receba em {deliveryTime} -{' '}
          <span
            className={`font-medium ${price === 0 ? themeClasses.text : ''}`}
          >
            {price === 0 ? 'Grátis' : formatCurrency(price)}
          </span>
        </p>
      </div>
    </div>
  )
}
