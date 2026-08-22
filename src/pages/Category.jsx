import { useMemo, useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import products from '../data/products'

function DropSection({ id, eyebrow, title, description, items }) {
  if (!items.length) return null

  return (
    <section id={id} className="border-t border-neutral-200 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              {eyebrow}
            </p>

            <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-7xl">
              {title}
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-neutral-500">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 6} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Category() {
  const [visibleCount, setVisibleCount] = useState(6)

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [visibleCount]
  )

  const visibleBrokenButBlessedProducts = useMemo(
    () => visibleProducts.filter((product) => product.collection === 'BROKEN BUT BLESSED'),
    [visibleProducts]
  )

  const visibleRioSummerClubProducts = useMemo(
    () => visibleProducts.filter((product) => product.collection === 'RIO SUMMER CLUB'),
    [visibleProducts]
  )

  const visibleDropOneProducts = useMemo(
    () => visibleProducts.filter((product) => product.collection === 'SS26 DROP 01'),
    [visibleProducts]
  )

  const hasMore = visibleCount < products.length

  const loadMore = () => {
    setVisibleCount((count) => Math.min(count + 6, products.length))
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pt-24 pb-14 md:px-10 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">
            ENGORIZ / COLLECTION 01
          </p>

          <h1 className="mt-5 font-display text-[clamp(4rem,10vw,9rem)] uppercase leading-[0.86] tracking-[-0.03em]">
            BROKEN
            <br />
            BUT BLESSED
          </h1>

          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            2026
          </p>
        </div>
      </section>

      <DropSection
        id="broken-but-blessed"
        eyebrow="Limited Drop"
        title="BROKEN BUT BLESSED"
        description="The current limited capsule with soft tones and a louder point of view."
        items={visibleBrokenButBlessedProducts}
      />

      <DropSection
        id="rio-summer-club"
        eyebrow="Archive"
        title="RIO SUMMER CLUB"
        description="The Rio Summer Club collection, kept as part of the archive rather than marked as the latest drop."
        items={visibleRioSummerClubProducts}
      />

      <DropSection
        id="ss26-drop-01"
        eyebrow="Last Drop"
        title="SS26 Drop 01"
        description="The first ENGORIZ release — raw graphics, oversized fits, limited quantity."
        items={visibleDropOneProducts}
      />

      {hasMore && (
        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <button
            type="button"
            onClick={loadMore}
            className="mx-auto mt-6 block rounded-full border border-black bg-white px-8 py-4 text-[12px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-white"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  )
}