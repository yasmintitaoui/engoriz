import { Link } from 'react-router-dom'
import hoodieFront from '../assets/products/hoodies/pink-hoodie/optimized/front-photo.webp'

import ProductCard from '../components/product/ProductCard'
import BestSellers from '../components/product/BestSellers'
import products from '../data/products'

export default function Home() {
  const hoodie = products.find((product) => product.slug === 'engoriz-makes-love-w26')
  const limitedTees = products.filter((product) =>
    ['broken-but-blessed-pink', 'broken-but-blessed-blue'].includes(product.slug)
  )

  return (
    <main className="bg-white">
      <section className="grid border-b border-neutral-200 md:min-h-[min(760px,calc(100svh-7rem))] md:grid-cols-[1.08fr_0.92fr]">
        <div className="relative aspect-4/5 overflow-hidden bg-white md:aspect-auto md:min-h-[min(760px,calc(100svh-7rem))]">
          <img
            src={hoodieFront}
            alt="Front view of the ENGORIZ Makes Love W’26 pink hoodie"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>

        <div className="flex items-center px-6 py-12 text-black sm:px-10 md:px-12 lg:px-16">
          <div className="w-full max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-500">W’26 / New release</p>
            <h1 className="mt-5 max-w-[11ch] font-display text-6xl uppercase leading-[0.88] sm:text-7xl lg:text-8xl">
              {hoodie?.name}
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-600">
              {hoodie?.description}
            </p>
            <div className="mt-7 flex items-center justify-between border-t border-neutral-200 pt-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Price</span>
              <span className="text-base font-medium">MAD {hoodie.price}</span>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to={`/product/${hoodie.slug}`}
                className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white! transition hover:bg-neutral-800 hover:text-white! active:bg-neutral-900 active:text-white! focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                Discover W’26 <span className="ml-4" aria-hidden="true">→</span>
              </Link>
              <Link
                to="/shop#tees"
                className="border-b border-neutral-400 pb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-600 transition hover:border-black hover:text-black active:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                Shop tees
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-tees" className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">Limited edition / SS26</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">Limited Editions</h2>
          </div>
          <Link to="/shop#broken-but-blessed" className="shrink-0 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:opacity-60 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
            Shop all tees
          </Link>
        </div>
        <div className="grid max-w-4xl grid-cols-2 gap-x-4 gap-y-9 md:gap-x-6">
          {limitedTees.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <BestSellers />

      <section className="border-y border-neutral-200 px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase leading-6 tracking-[0.2em] text-neutral-500">
            Cash on delivery across Morocco <span className="px-2 text-neutral-300">/</span> Made by demand after confirmation
          </p>
          <nav aria-label="Shop by garment" className="flex gap-6">
            <Link to="/shop#tees" className="border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:text-neutral-500 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
              Shop Tees
            </Link>
            <Link to="/shop#hoodies" className="border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:text-neutral-500 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
              Shop Hoodies
            </Link>
            <Link to="/shop" className="border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:text-neutral-500 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
              Shop All
            </Link>
          </nav>
        </div>
      </section>
    </main>
  )
}