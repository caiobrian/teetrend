import { redirect } from 'next/navigation'
import { getAllProducts } from '@/services/product-service'

export default async function HomePage() {
  const products = await getAllProducts()
  if (products && products.length > 0) {
    redirect(`/produto/${products[0].id}`)
  }
}
