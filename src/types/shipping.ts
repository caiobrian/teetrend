export interface Address {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export interface UseShippingCalculatorResult {
  cep: string
  address: Address | null
  loading: boolean
  error: string
  handleCepChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fetchAddressManually: () => void
}

export interface AddressEventDetail {
  address: Address | null
}
