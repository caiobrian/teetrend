import { Product, ProductImage } from '@/services/product-service'

interface ProductImages {
  [color: string]: ProductImage[]
}

export function getProductImagesByColor(
  product: Product | null | undefined,
  colorId: string,
): ProductImage[] {
  if (!product || !product.images) return []

  if (product.images[colorId]) {
    return product.images[colorId]
  }

  const availableColorWithImages = product.colors.find(
    color => color.available && product.images[color.value]?.length > 0,
  )
  if (
    availableColorWithImages &&
    product.images[availableColorWithImages.value]
  ) {
    return product.images[availableColorWithImages.value]
  }

  const firstImageColorKey = Object.keys(product.images)[0]
  if (firstImageColorKey && product.images[firstImageColorKey]) {
    return product.images[firstImageColorKey]
  }

  return []
}

export function getFirstProductImage(
  images: ProductImages | undefined,
): string {
  if (!images) return ''

  const firstColorKey = Object.keys(images)[0]
  if (
    firstColorKey &&
    images[firstColorKey] &&
    images[firstColorKey].length > 0
  ) {
    return images[firstColorKey][0].url
  }

  for (const key in images) {
    if (images[key] && images[key].length > 0) {
      return images[key][0].url
    }
  }

  return ''
}
