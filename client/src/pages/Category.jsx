import { useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import products from '../data/products'
import { isProductVisibleInListings } from '../utils/productVisibility'

function DropSection({ id, eyebrow, title, description, items, pageSize = 6 }) {
  const [visibleCount, setVisibleCount] = useState(pageSize)

  if (!items.length) return null

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <section id={id} className="scroll-mt-32 border-t border-neutral-200 px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">
              {eyebrow}
            </p>

            <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl md:text-6xl">
              {title}
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-neutral-500">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {visibleItems.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 6} />
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + pageSize, items.length))}
            className="mx-auto mt-10 block min-h-11 border border-black px-7 text-[10px] uppercase tracking-[0.24em] transition hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            Load more
          </button>
        )}
      </div>
    </section>
  )
}

export default function Category() {
  const tees = products.filter((product) =>
    isProductVisibleInListings(product) && product.category !== 'hoodies'
  )
  const hoodies = products.filter((product) =>
    isProductVisibleInListings(product) && product.category === 'hoodies'
  )
  const brokenButBlessed = tees.filter((product) => product.collection === 'BROKEN BUT BLESSED')
  const rioSummerClub = tees.filter((product) => product.collection === 'RIO SUMMER CLUB')
  const ss26DropOne = tees.filter((product) => product.collection === 'SS26 DROP 01')

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-10 pt-20 md:px-10 md:pb-14 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">
            ENGORIZ / W’26 RELEASE
          </p>

            <h1 className="mt-4 max-w-full font-display text-5xl uppercase leading-none sm:text-7xl md:text-8xl">
            Shop the release
          </h1>

          <nav aria-label="Shop categories" className="mt-8 flex flex-wrap gap-3">
            <a href="#tees" className="min-h-11 border border-black bg-black px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white! transition hover:bg-neutral-800 hover:text-white! active:bg-neutral-900 active:text-white! focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">Tees</a>
            <a href="#hoodies" className="min-h-11 border border-neutral-300 px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:border-black active:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">Hoodies</a>
          </nav>
        </div>
      </section>

      <div id="tees" className="scroll-mt-28">
        <section className="border-t border-neutral-200 px-6 py-10 md:px-10 md:py-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Garment category</p>
            <h2 className="mt-2 font-display text-5xl uppercase leading-none md:text-6xl">Tees</h2>
          </div>
        </section>

        <DropSection
          id="broken-but-blessed"
          eyebrow="Limited Drop"
          title="BROKEN BUT BLESSED"
          description="The limited capsule, including the original light pink and light blue editions."
          items={brokenButBlessed}
        />

        <DropSection
          id="rio-summer-club"
          eyebrow="Archive"
          title="RIO SUMMER CLUB"
          description="The Rio Summer Club collection, kept as part of the archive rather than marked as the latest drop."
          items={rioSummerClub}
        />

        <DropSection
          id="ss26-drop-01"
          eyebrow="Last Drop"
          title="SS26 Drop 01"
          description="The first ENGORIZ release, with the original collection grouping preserved."
          items={ss26DropOne}
        />
      </div>

      <div id="hoodies" className="scroll-mt-28">
        <DropSection
          id="w26-hoodies"
          eyebrow="W’26 / New release"
          title="Hoodies"
          description="The W’26 hoodie release."
          items={hoodies}
          pageSize={6}
        />
      </div>
    </main>
  )
}