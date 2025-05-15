import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductImage } from '@/components/ProductImage'
import { ProductHeader } from '@/components/ProductHeader'
import { ShippingCalculator } from '@/components/ShippingCalculator'
import { ProductActions } from '@/components/ProductActions'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ProductBenefits } from '@/components/ProductBenefits'
import { ProductDetails } from '@/components/ProductDetails'
import { BiCheckCircle } from 'react-icons/bi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdOutlineSecurity } from 'react-icons/md'

import { getProductById } from '@/services/product-service'
import { getFirstProductImage } from '@/lib/utils/product'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductById(resolvedParams.slug)

  if (!product) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto que você está procurando não existe',
    }
  }

  const mainImageUrl = getFirstProductImage(product.images)

  return {
    title: `${product.title} | TeeTrend`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: mainImageUrl ? [mainImageUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProductById(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const category = product.category || 'categoria'

  return (
    <div className='bg-white min-h-screen'>
      <Breadcrumb category={category} productTitle={product.title} />

      <main className='container mx-auto px-4 py-4'>
        <div className='flex flex-col md:flex-row gap-10'>
          <div className='w-full md:w-2/5'>
            <ProductImage
              productImages={product.images}
              productColors={product.colors}
              productId={product.id}
            />
          </div>

          <div className='w-full md:w-3/5'>
            <ProductHeader
              title={product.title}
              rating={product.rating || 0}
              reviewCount={product.reviewCount || 0}
              price={product.price}
              discountPrice={product.discountPrice}
            />

            <div className='mt-6 text-gray-600 border-b border-gray-200 pb-4'>
              <p>{product.description}</p>
            </div>

            <div className='mt-4 flex flex-wrap gap-6 border-b border-gray-200 pb-4'>
              <div className='flex items-center space-x-2'>
                <BiCheckCircle className='h-5 w-5 text-green-600' />
                <span className='text-green-600 font-medium'>Em estoque</span>
              </div>

              <div className='flex items-center space-x-2'>
                <AiOutlineClockCircle className='h-5 w-5 text-blue-600' />
                <span className='text-blue-600'>
                  Entrega expressa disponível
                </span>
              </div>

              <div className='flex items-center space-x-2'>
                <MdOutlineSecurity className='h-5 w-5 text-orange-500' />
                <span className='text-orange-500'>Compra segura</span>
              </div>
            </div>

            <ProductActions product={product} />

            <ShippingCalculator />

            <ProductBenefits />

            <ProductDetails
              composition={product.composition}
              features={product.features}
              productId={product.id}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
