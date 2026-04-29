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
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Category() {
  const lovePainProducts = products.filter(
    (product) => product.dropName === 'LOVE PAIN CAPSULE'
  )

  const dropOneProducts = products.filter(
    (product) => product.collection === 'SS26 DROP 01'
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pt-24 pb-14 md:px-10 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
            ENGORIZ STORE
          </p>

          <h1 className="mt-5 font-display text-[clamp(4rem,10vw,9rem)] uppercase leading-[0.86] tracking-[-0.03em]">
            Shop
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500">
            Explore the latest ENGORIZ drops. Graphic oversized tees, limited
            releases, cash on delivery across Morocco.
          </p>
        </div>
      </section>

      <DropSection
        id="love-pain"
        eyebrow="New Drop"
        title="Love Pain Capsule"
        description="Two Love Pain silhouettes, multiple colorways, one capsule."
        items={lovePainProducts}
      />

      <DropSection
        id="ss26-drop-01"
        eyebrow="Archive Drop"
        title="SS26 Drop 01"
        description="The first ENGORIZ release — raw graphics, oversized fits, limited quantity."
        items={dropOneProducts}
      />
    </main>
  )
}