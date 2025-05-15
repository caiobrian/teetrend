'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Product, ProductColor } from '@/services/product-service'
import { getProductImagesByColor } from '@/lib/utils/product'
import { setCookie, getCookie } from '@/lib/utils/cookies'
import {
  COOKIE_EXPIRATION_MINUTES,
  COLOR_COOKIE_NAME,
  SIZE_COOKIE_NAME,
} from '@/lib/constants/cookie'

interface UseProductVariantsProps {
  productImages: Product['images']
  productColors: ProductColor[]
}

export function useProductVariants({
  productImages,
  productColors,
}: UseProductVariantsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const colorOptions = useMemo(
    () => productColors.map(c => ({ ...c, id: String(c.id) })),
    [productColors],
  )

  const getAvailableSizesForColor = useCallback(
    (colorValue: string) => {
      const activeColor = productColors.find(
        color => color.value === colorValue,
      )
      return (
        activeColor?.sizes?.map(size => ({ ...size, id: String(size.id) })) ||
        []
      )
    },
    [productColors],
  )

  const getStateFromCookies = useCallback(() => {
    const colorFromCookie = getCookie(COLOR_COOKIE_NAME) || ''
    const sizeFromCookie = getCookie(SIZE_COOKIE_NAME) || ''
    return { selectedColor: colorFromCookie, selectedSize: sizeFromCookie }
  }, [])

  const findFirstAvailableColorWithImages = useCallback(() => {
    return (
      colorOptions.find(
        color =>
          color.available &&
          getProductImagesByColor(
            { images: productImages, colors: productColors } as Product,
            color.value,
          ).length > 0,
      )?.value || ''
    )
  }, [colorOptions, productImages, productColors])

  const findFirstAvailableSize = useCallback(
    (colorValue: string) => {
      const availableSizes = getAvailableSizesForColor(colorValue)
      return availableSizes.find(size => size.available)?.value || ''
    },
    [getAvailableSizesForColor],
  )

  const isColorValid = useCallback(
    (colorValue: string | null): boolean => {
      return Boolean(
        colorValue &&
          colorOptions.some(
            color => color.value === colorValue && color.available,
          ),
      )
    },
    [colorOptions],
  )

  const isSizeValidForColor = useCallback(
    (sizeValue: string | null, colorValue: string): boolean => {
      if (!sizeValue || !colorValue) return false

      const availableSizes = getAvailableSizesForColor(colorValue)
      return availableSizes.some(
        size => size.value === sizeValue && size.available,
      )
    },
    [getAvailableSizesForColor],
  )

  const saveToCookies = useCallback((colorValue: string, sizeValue: string) => {
    setCookie(COLOR_COOKIE_NAME, colorValue, COOKIE_EXPIRATION_MINUTES)
    setCookie(SIZE_COOKIE_NAME, sizeValue, COOKIE_EXPIRATION_MINUTES)
  }, [])

  const initializeState = useCallback(() => {
    const colorFromUrl = searchParams.get('color')
    const sizeFromUrl = searchParams.get('size')

    if (isColorValid(colorFromUrl)) {
      const selectedColor = colorFromUrl as string

      let selectedSize = ''
      if (isSizeValidForColor(sizeFromUrl, selectedColor)) {
        selectedSize = sizeFromUrl as string
      } else {
        selectedSize = findFirstAvailableSize(selectedColor)
      }

      saveToCookies(selectedColor, selectedSize)
      return { selectedColor, selectedSize }
    }

    const colorFromCookie = getCookie(COLOR_COOKIE_NAME)
    if (isColorValid(colorFromCookie)) {
      const selectedColor = colorFromCookie as string

      const sizeFromCookie = getCookie(SIZE_COOKIE_NAME)
      let selectedSize = ''

      if (isSizeValidForColor(sizeFromCookie, selectedColor)) {
        selectedSize = sizeFromCookie as string
      } else {
        selectedSize = findFirstAvailableSize(selectedColor)
        setCookie(SIZE_COOKIE_NAME, selectedSize, COOKIE_EXPIRATION_MINUTES)
      }

      return { selectedColor, selectedSize }
    }

    const selectedColor = findFirstAvailableColorWithImages()

    if (selectedColor) {
      const selectedSize = findFirstAvailableSize(selectedColor)
      saveToCookies(selectedColor, selectedSize)
      return { selectedColor, selectedSize }
    }

    return { selectedColor: '', selectedSize: '' }
  }, [
    searchParams,
    isColorValid,
    isSizeValidForColor,
    findFirstAvailableSize,
    findFirstAvailableColorWithImages,
    saveToCookies,
  ])

  const { selectedColor: initialColor, selectedSize: initialSize } = useMemo(
    () => initializeState(),
    [initializeState],
  )

  const [selectedColor, setSelectedColorState] = useState(initialColor)
  const [selectedSize, setSelectedSizeState] = useState(initialSize)

  const availableSizesForSelectedColor = useMemo(
    () => getAvailableSizesForColor(selectedColor),
    [selectedColor, getAvailableSizesForColor],
  )

  const updateUrlParams = useCallback(
    (colorValue: string, sizeValue: string) => {
      const newParams = new URLSearchParams(searchParams.toString())

      if (colorValue) {
        newParams.set('color', colorValue)
      } else {
        newParams.delete('color')
      }

      if (sizeValue) {
        newParams.set('size', sizeValue)
      } else {
        newParams.delete('size')
      }

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const setSelectedColor = useCallback(
    (colorValue: string) => {
      if (!colorValue) return

      setCookie(COLOR_COOKIE_NAME, colorValue, COOKIE_EXPIRATION_MINUTES)
      setSelectedColorState(colorValue)

      const currentSize = getCookie(SIZE_COOKIE_NAME) || ''
      let sizeToUse = currentSize

      if (!isSizeValidForColor(currentSize, colorValue)) {
        sizeToUse = findFirstAvailableSize(colorValue)
        setCookie(SIZE_COOKIE_NAME, sizeToUse, COOKIE_EXPIRATION_MINUTES)
        setSelectedSizeState(sizeToUse)
      }

      updateUrlParams(colorValue, sizeToUse)
    },
    [setCookie, isSizeValidForColor, findFirstAvailableSize, updateUrlParams],
  )

  const setSelectedSize = useCallback(
    (sizeValue: string) => {
      setCookie(SIZE_COOKIE_NAME, sizeValue, COOKIE_EXPIRATION_MINUTES)
      setSelectedSizeState(sizeValue)
      updateUrlParams(selectedColor, sizeValue)
    },
    [selectedColor, updateUrlParams],
  )

  useEffect(() => {
    const { selectedColor: colorFromCookie, selectedSize: sizeFromCookie } =
      getStateFromCookies()

    const colorFromUrl = searchParams.get('color')
    const sizeFromUrl = searchParams.get('size')

    if (
      (colorFromUrl !== colorFromCookie && colorFromCookie) ||
      (sizeFromUrl !== sizeFromCookie && sizeFromCookie)
    ) {
      updateUrlParams(colorFromCookie, sizeFromCookie)
    }
  }, [searchParams, getStateFromCookies, updateUrlParams])

  const handleColorChange = useCallback(
    (value: string) => {
      setSelectedColor(value)
    },
    [setSelectedColor],
  )

  const handleSizeChange = useCallback(
    (value: string) => {
      setSelectedSize(value)
    },
    [setSelectedSize],
  )

  return {
    selectedColor,
    selectedSize,
    handleColorChange,
    handleSizeChange,
    availableSizesForSelectedColor,
    colorOptions,
  }
}
