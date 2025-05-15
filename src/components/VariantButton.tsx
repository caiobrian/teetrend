import { VariantButtonProps } from '@/types/variants'

const BUTTON_STATES = {
  disabled: 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200',
  selected: 'bg-blue-50 border-blue-500 text-blue-700',
  default: 'border-gray-300 text-gray-700 hover:bg-gray-50',
} as const

export function VariantButton({
  option,
  isSelected,
  onClick,
}: VariantButtonProps) {
  const getButtonState = () => {
    if (!option.available) return BUTTON_STATES.disabled
    if (isSelected) return BUTTON_STATES.selected
    return BUTTON_STATES.default
  }

  return (
    <button
      onClick={() => option.available && onClick(option.value)}
      disabled={!option.available}
      className={`px-3 py-1 border rounded-md text-sm font-medium ${getButtonState()}`}
      role='radio'
      aria-checked={isSelected}
      aria-disabled={!option.available}
    >
      {option.label}
    </button>
  )
}
