import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import products from '../../data/products'

export default function ProductGrid() {
  const newDropProducts = products
    .filter((product) => product.dropName === 'LOVE PAIN CAPSULE')
    .slice(0, 4)

  if (newDropProducts.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
            New Drop
          </p>

          <h2 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">
            Love Pain Capsule
          </h2>
        </div>

        <Link
          to="/shop"
          className="hidden border-b border-black pb-1 text-[11px] uppercase tracking-[0.28em] transition hover:opacity-50 md:block"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {newDropProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link
        to="/shop"
        className="mt-10 inline-block border-b border-black pb-1 text-[11px] uppercase tracking-[0.28em] transition hover:opacity-50 md:hidden"
      >
        View All
      </Link>
    </section>
  )
}