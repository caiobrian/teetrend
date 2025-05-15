import { useState, useEffect, useCallback } from 'react'
import { CartItem } from '@/types/cart'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import {
  COOKIE_EXPIRATION_MINUTES,
  CART_COOKIE_NAME,
} from '@/lib/constants/cookie'
import { CART_UPDATED_EVENT } from '@/lib/constants/events'
import { Product } from '@/services/product-service'

export interface AddToCartOptions {
  product: Product
  color: string
  size: string
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)

  const loadCartData = useCallback(() => {
    const cartDataString = getCookie(CART_COOKIE_NAME)
    if (!cartDataString) {
      setItems([])
      setItemCount(0)
      return
    }

    try {
      const cartItems: CartItem[] = JSON.parse(cartDataString)
      setItems(cartItems)
      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
      setItemCount(count)
    } catch (error) {
      console.error('Erro ao processar dados do carrinho:', error)
      setItems([])
      setItemCount(0)
    }
  }, [])

  useEffect(() => {
    loadCartData()

    const handleCartUpdate = () => loadCartData()
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate)

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate)
    }
  }, [loadCartData])

  const getProductImageUrl = useCallback((product: Product, color: string) => {
    if (
      product.images &&
      product.images[color] &&
      product.images[color].length > 0
    ) {
      return product.images[color][0].url
    }

    if (product.images && Object.keys(product.images).length > 0) {
      const firstColorWithImages = Object.keys(product.images).find(
        colorKey =>
          product.images &&
          product.images[colorKey] &&
          product.images[colorKey].length > 0,
      )
      if (
        firstColorWithImages &&
        product.images[firstColorWithImages] &&
        product.images[firstColorWithImages].length > 0
      ) {
        return product.images[firstColorWithImages][0].url
      }
    }

    return '/images/placeholder.jpg'
  }, [])

  const addToCart = useCallback(
    ({ product, color, size }: AddToCartOptions) => {
      if (!product || !color || !size) {
        throw new Error('Dados do produto incompletos')
      }

      const cartItemsString = getCookie(CART_COOKIE_NAME)
      const cart: CartItem[] = cartItemsString
        ? JSON.parse(cartItemsString)
        : []

      const cartItemId = `${product.id}-${color}-${size}`
      const existingItemIndex = cart.findIndex(item => item.id === cartItemId)

      const productPrice = Number(product.discountPrice || product.price)
      if (isNaN(productPrice)) {
        throw new Error('Preço do produto inválido')
      }

      const imageUrl = getProductImageUrl(product, color)

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1
      } else {
        cart.push({
          id: cartItemId,
          productId: product.id,
          title: product.title,
          price: productPrice,
          color,
          size,
          quantity: 1,
          imageUrl,
        })
      }

      setCookie(
        CART_COOKIE_NAME,
        JSON.stringify(cart),
        COOKIE_EXPIRATION_MINUTES,
      )
      window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT))

      return `${product.title} (${color}, ${size}) adicionado ao carrinho!`
    },
    [getProductImageUrl],
  )

  const removeItem = useCallback((itemId: string) => {
    const currentCartString = getCookie(CART_COOKIE_NAME)
    let currentCart: CartItem[] = currentCartString
      ? JSON.parse(currentCartString)
      : []

    currentCart = currentCart.filter(item => item.id !== itemId)

    setCookie(
      CART_COOKIE_NAME,
      JSON.stringify(currentCart),
      COOKIE_EXPIRATION_MINUTES,
    )
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT))
  }, [])

  const calculateTotal = useCallback((cartItems: CartItem[]) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [])

  return {
    items,
    itemCount,
    removeItem,
    calculateTotal,
    loadCartData,
    addToCart,
  }
}
