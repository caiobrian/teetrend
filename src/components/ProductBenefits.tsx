import { TbTruckDelivery } from 'react-icons/tb'
import { BsCreditCard2Front } from 'react-icons/bs'
import { IoReturnDownBack } from 'react-icons/io5'

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
}

function BenefitCard({ icon, title, description, bgColor }: BenefitCardProps) {
  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${bgColor}`}>
      <div className='flex items-start'>
        {icon}
        <div>
          <h3 className='font-medium text-gray-900'>{title}</h3>
          <p className='text-sm text-gray-600 mt-1'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export function ProductBenefits() {
  const benefits = [
    {
      icon: (
        <TbTruckDelivery className='h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-0.5' />
      ),
      title: 'Opções de Entrega',
      description: 'Frete grátis acima de R$199',
      bgColor: 'bg-blue-50',
    },
    {
      icon: (
        <BsCreditCard2Front className='h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-0.5' />
      ),
      title: 'Pagamento',
      description: 'Até 12x sem juros',
      bgColor: 'bg-green-50',
    },
    {
      icon: (
        <IoReturnDownBack className='h-6 w-6 text-orange-500 mr-2 flex-shrink-0 mt-0.5' />
      ),
      title: 'Devolução',
      description: '30 dias garantidos',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
      {benefits.map(benefit => (
        <BenefitCard key={benefit.title} {...benefit} />
      ))}
    </div>
  )
}
