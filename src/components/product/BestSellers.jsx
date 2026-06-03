import ProductCard from './ProductCard'
import products from '../../data/products'

export default function BestSellers() {
  const order = ['njr', 'gtd', 'tysonism', 'love-pain']

  const bestSellers = order
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)

  if (bestSellers.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
            Best Sellers
          </p>

          <h2 className="mt-4 font-display text-6xl uppercase md:text-8xl">
            BEST SELLERS
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}