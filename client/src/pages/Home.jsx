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
        <Link
          to={`/product/${hoodie.slug}`}
          aria-label={`Shop ${hoodie.name}`}
          className="relative block aspect-[4/3] overflow-hidden bg-neutral-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black sm:aspect-4/5 md:aspect-auto md:min-h-[min(760px,calc(100svh-7rem))]"
        >
          <img
            src={hoodieFront}
            alt="Front view of the ENGORIZ Makes Love W’26 pink hoodie"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-contain transition duration-500 hover:scale-[1.015]"
          />
        </Link>

        <div className="flex items-center px-5 py-8 text-black sm:px-10 sm:py-12 md:px-12 md:py-12 lg:px-16">
          <div className="w-full max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-500">W’26 / New release</p>
            <h1 className="mt-4 max-w-[11ch] font-display text-5xl uppercase leading-[0.9] sm:mt-5 sm:text-7xl lg:text-8xl">
              {hoodie?.name}
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-600">
              {hoodie?.description}
            </p>
            <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-neutral-200 pt-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-base font-medium">MAD {hoodie.price}</span>
                <span className="text-xs text-neutral-400">
                  <span className="mr-1 uppercase tracking-[0.12em]">Original</span>
                  <s>MAD 449</s>
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/shop#hoodies"
                className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white! transition hover:bg-neutral-800 hover:text-white! active:bg-neutral-900 active:text-white! focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                Shop Hoodies <span className="ml-4" aria-hidden="true">→</span>
              </Link>
              <Link
                to={`/product/${hoodie.slug}`}
                className="border-b border-neutral-400 pb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-600 transition hover:border-black hover:text-black active:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                Choose size
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="hoodie-shop" className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">W’26 / New release</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">Shop Hoodies</h2>
          </div>
          <Link
            to={`/product/${hoodie.slug}`}
            className="shrink-0 border-b border-black pb-1 text-[10px] uppercase tracking-[0.16em] transition hover:opacity-60 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            Choose size
          </Link>
        </div>
        <div className="grid max-w-md grid-cols-1">
          <ProductCard product={hoodie} priority />
        </div>
      </section>

      <section id="featured-tees" className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">Limited edition / SS26</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-6xl">Limited Editions</h2>
          </div>
          <Link to="/shop#broken-but-blessed" className="shrink-0 border-b border-black pb-1 text-[10px] uppercase tracking-[0.2em] transition hover:opacity-60 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
            Shop all tees
          </Link>
        </div>
        <div className="grid max-w-4xl grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 sm:gap-y-9 md:gap-x-6">
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