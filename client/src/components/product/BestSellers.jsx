import ProductCard from './ProductCard'
import products from '../../data/products'
import { isProductVisibleInListings } from '../../utils/productVisibility'

export default function BestSellers() {
  const order = [
    'broken-but-blessed',
    'rio-de-janeiro',
    'rio-gold',
    'brent',
    'love-pain',
    'rude-man',
    '2pac',
  ]

  const bestSellers = order
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((product) => product && isProductVisibleInListings(product))

  if (bestSellers.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">
            Best Sellers
          </p>

          <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
            BEST SELLERS
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}