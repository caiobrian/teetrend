import { Address } from '@/types/shipping'
import {
  CEP_LENGTH,
  CLEAN_CEP_REGEX,
  CEP_ERROR_MESSAGES,
  VIACEP_BASE_URL,
  REQUEST_TIMEOUT_MS,
} from '@/lib/constants/cep'

export class CepError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CepError'
  }
}

export const fetchAddressByCep = async (cep: string): Promise<Address> => {
  const cleanCep = cep.replace(CLEAN_CEP_REGEX, '')

  if (cleanCep.length !== CEP_LENGTH) {
    throw new CepError(CEP_ERROR_MESSAGES.INVALID_LENGTH)
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    const response = await fetch(`${VIACEP_BASE_URL}/${cleanCep}/json/`, {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: Address = await response.json()

    if (data.erro) {
      throw new CepError(CEP_ERROR_MESSAGES.NOT_FOUND)
    }

    return data
  } catch (error) {
    if (error instanceof CepError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(CEP_ERROR_MESSAGES.TIMEOUT)
      }
      if (error.name === 'TypeError') {
        throw new Error(CEP_ERROR_MESSAGES.NETWORK_ERROR)
      }
    }

    throw new Error(CEP_ERROR_MESSAGES.FETCH_ERROR)
  }
}
