import { Address } from '@/types/shipping'
import { CLEAN_CEP_REGEX } from '@/lib/constants/cep'

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatLocation = (address: Address) => {
  const cepDigits = address.cep.replace(CLEAN_CEP_REGEX, '')
  return `${address.localidade}, ${cepDigits}`
}
