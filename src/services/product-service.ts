import { PRODUCTS as mockProducts } from '@/lib/mocks/mock-data'

export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductColor {
  id: string
  label: string
  value: string
  available: boolean
  sizes?: ProductSize[]
}

export interface ProductSize {
  id: string
  label: string
  value: string
  available: boolean
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  discountPrice?: number
  rating?: number
  reviewCount?: number
  composition?: string
  features?: string[]
  sizes: ProductSize[]
  colors: ProductColor[]
  images: {
    [colorValue: string]: ProductImage[]
  }
  category?: string
}

const simulateApiCall = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}

export const getAllProducts = async (): Promise<Product[]> => {
  const products: Product[] = mockProducts as Product[]
  return simulateApiCall(products)
}

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  const products: Product[] = mockProducts as Product[]
  const product = products.find(p => p.id === id)
  return simulateApiCall(product)
}
