import { useState, useEffect, useCallback } from 'react'
import { Address } from '@/types/shipping'
import { getCookie } from '@/lib/utils/cookies'
import { ADDRESS_COOKIE_NAME } from '@/lib/constants/cookie'
import { ADDRESS_UPDATED_EVENT } from '@/lib/constants/events'

export const useAddress = () => {
  const [savedAddress, setSavedAddress] = useState<Address | null>(null)

  const loadSavedAddress = useCallback(() => {
    const addressDataString = getCookie(ADDRESS_COOKIE_NAME)
    if (!addressDataString) {
      setSavedAddress(null)
      return
    }

    try {
      const parsedAddress: Address = JSON.parse(addressDataString)
      if (
        parsedAddress &&
        !parsedAddress.erro &&
        parsedAddress.cep &&
        parsedAddress.localidade &&
        parsedAddress.uf
      ) {
        setSavedAddress(parsedAddress)
      } else {
        setSavedAddress(null)
      }
    } catch (error) {
      console.error('Erro ao processar endereço salvo do cookie:', error)
      setSavedAddress(null)
    }
  }, [])

  useEffect(() => {
    loadSavedAddress()

    const handleAddressUpdate = () => {
      loadSavedAddress()
    }

    window.addEventListener(ADDRESS_UPDATED_EVENT, handleAddressUpdate)

    return () => {
      window.removeEventListener(ADDRESS_UPDATED_EVENT, handleAddressUpdate)
    }
  }, [loadSavedAddress])

  return {
    savedAddress,
  }
}
