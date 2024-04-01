import { Product } from '@/lib/models/ProductModel'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const ProductItem = ({product}:{product:Product}) => {
  return (
    <div className='card bg-base-300 shadow-xl mb-4'>
        <figure>
            <Link href={`/product/${product.slug}`}>
                <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className='object-cover w-full h-64'
                />
            </Link>
        </figure>
        <div className='card-body'>
            <Link href={`/product/${product.slug}`}>
                <h2 className='card-title font-medium'>{product.name}</h2>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <div className='card-actions flex items-center justify-between'>
                <span className='text-2xl'>{product.price}</span>
            </div>
        </div>
    </div>
  )
}

export default ProductItem