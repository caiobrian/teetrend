import { useState, useEffect, useCallback } from 'react'
import { fetchAddressByCep } from '@/services/cep-service'
import { setCookie, getCookie } from '@/lib/utils/cookies'
import {
  COOKIE_EXPIRATION_MINUTES,
  CEP_COOKIE_NAME,
  ADDRESS_COOKIE_NAME,
} from '@/lib/constants/cookie'
import { ADDRESS_UPDATED_EVENT } from '@/lib/constants/events'
import {
  CEP_LENGTH,
  CLEAN_CEP_REGEX,
  FORMAT_CEP_REGEX,
  CEP_ERROR_MESSAGES,
} from '@/lib/constants/cep'
import {
  UseShippingCalculatorResult,
  AddressEventDetail,
  Address,
} from '@/types/shipping'

export const useShippingCalculator = (): UseShippingCalculatorResult => {
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const dispatchAddressEvent = useCallback((addressData: Address | null) => {
    const event = new CustomEvent<AddressEventDetail>(ADDRESS_UPDATED_EVENT, {
      detail: { address: addressData },
    })
    window.dispatchEvent(event)
  }, [])

  const clearAddressData = useCallback(() => {
    setAddress(null)
    setCookie(ADDRESS_COOKIE_NAME, '', COOKIE_EXPIRATION_MINUTES)
    dispatchAddressEvent(null)
  }, [dispatchAddressEvent])

  const fetchAddress = useCallback(
    async (cepToFetch: string) => {
      const cleanCep = cepToFetch.replace(CLEAN_CEP_REGEX, '')

      if (cleanCep.length !== CEP_LENGTH) {
        clearAddressData()
        return
      }

      setLoading(true)
      setError('')
      clearAddressData()

      try {
        const data = await fetchAddressByCep(cleanCep)
        setAddress(data)

        if (data && !data.erro) {
          setCookie(
            ADDRESS_COOKIE_NAME,
            JSON.stringify(data),
            COOKIE_EXPIRATION_MINUTES,
          )
          dispatchAddressEvent(data)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : CEP_ERROR_MESSAGES.FETCH_ERROR
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [clearAddressData, dispatchAddressEvent],
  )

  const formatCep = useCallback((value: string): string => {
    return value.replace(FORMAT_CEP_REGEX, '$1-$2')
  }, [])

  const loadSavedAddress = useCallback(() => {
    const savedAddressString = getCookie(ADDRESS_COOKIE_NAME)
    if (!savedAddressString) return

    try {
      const savedAddressData: Address = JSON.parse(savedAddressString)
      if (!savedAddressData || savedAddressData.erro) return

      setAddress(savedAddressData)
      dispatchAddressEvent(savedAddressData)

      if (savedAddressData.cep) {
        const formattedCep = formatCep(
          savedAddressData.cep.replace(CLEAN_CEP_REGEX, ''),
        )
        if (cep !== formattedCep) {
          setCep(formattedCep)
        }
      }
    } catch {
      setCookie(ADDRESS_COOKIE_NAME, '', COOKIE_EXPIRATION_MINUTES)
    }
  }, [cep, formatCep, dispatchAddressEvent])

  useEffect(() => {
    const savedCep = getCookie(CEP_COOKIE_NAME)

    if (getCookie(ADDRESS_COOKIE_NAME)) {
      loadSavedAddress()
    } else if (savedCep) {
      setCep(savedCep)
      const cleanSavedCep = savedCep.replace(CLEAN_CEP_REGEX, '')
      if (cleanSavedCep.length === CEP_LENGTH) {
        fetchAddress(cleanSavedCep)
      }
    }
  }, [fetchAddress, loadSavedAddress])

  const handleCepChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(CLEAN_CEP_REGEX, '')

      if (value.length > CEP_LENGTH) return

      const formattedValue = value.length > 5 ? formatCep(value) : value
      setCep(formattedValue)
      setCookie(CEP_COOKIE_NAME, formattedValue, COOKIE_EXPIRATION_MINUTES)

      if (value.length === CEP_LENGTH) {
        fetchAddress(value)
      } else {
        clearAddressData()
        setError('')
      }
    },
    [fetchAddress, clearAddressData, formatCep],
  )

  const fetchAddressManually = useCallback(() => {
    const cleanCep = cep.replace(CLEAN_CEP_REGEX, '')

    if (cleanCep.length === CEP_LENGTH) {
      fetchAddress(cleanCep)
    } else {
      setError(CEP_ERROR_MESSAGES.INVALID_LENGTH)
      clearAddressData()
    }
  }, [cep, fetchAddress, clearAddressData])

  return {
    cep,
    address,
    loading,
    error,
    handleCepChange,
    fetchAddressManually,
  }
}
