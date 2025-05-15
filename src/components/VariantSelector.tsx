'use client'

import { VariantOption } from '@/types/variants'
import { VariantButton } from './VariantButton'

interface VariantSelectorProps {
  title: string
  options: VariantOption[]
  onChange: (value: string) => void
  value?: string
}

export function VariantSelector({
  title,
  options,
  onChange,
  value,
}: VariantSelectorProps) {
  const handleOptionClick = (newValue: string) => {
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  return (
    <div className='my-4'>
      <h3 className='text-sm font-medium text-gray-700 mb-1'>{title}</h3>
      <div
        className='flex flex-wrap gap-2'
        role='radiogroup'
        aria-label={title}
      >
        {options.map(option => (
          <VariantButton
            key={option.id}
            option={option}
            isSelected={value === option.value}
            onClick={handleOptionClick}
          />
        ))}
      </div>
    </div>
  )
}
