'use client'

import { VariantSelector } from './VariantSelector'

interface VariantOption {
  id: string
  label: string
  value: string
  available: boolean
}

interface VariantSelectorsWrapperProps {
  selectedColor: string
  selectedSize: string
  onColorChange: (value: string) => void
  onSizeChange: (value: string) => void
  colorOptions: VariantOption[]
  availableSizesForSelectedColor: VariantOption[]
}

export function VariantSelectorsWrapper({
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  colorOptions,
  availableSizesForSelectedColor,
}: VariantSelectorsWrapperProps) {
  return (
    <div className='mt-8'>
      {selectedColor && availableSizesForSelectedColor.length > 0 && (
        <VariantSelector
          title='Tamanho'
          options={availableSizesForSelectedColor}
          onChange={onSizeChange}
          value={selectedSize}
        />
      )}

      {colorOptions && colorOptions.length > 0 && (
        <VariantSelector
          title='Cor'
          options={colorOptions}
          onChange={onColorChange}
          value={selectedColor}
        />
      )}
    </div>
  )
}
