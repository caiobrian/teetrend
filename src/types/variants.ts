export interface VariantOption {
  id: string
  label: string
  value: string
  available: boolean
}

export interface VariantButtonProps {
  option: VariantOption
  isSelected: boolean
  onClick: (value: string) => void
}
