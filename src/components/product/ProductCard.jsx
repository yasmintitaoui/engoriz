import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="%23ffffff"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="22" fill="%23999999" letter-spacing="8">ENGORIZ</text></svg>'

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  const defaultColor = product.colors?.[0]?.name || null
  const [selectedColor, setSelectedColor] = useState(defaultColor)

  const activeImages = useMemo(() => {
    if (product.imagesByColor && selectedColor) {
      return product.imagesByColor[selectedColor] || product.images
    }

    return product.images || {}
  }, [product, selectedColor])

  const front = activeImages.front || product.images?.front || PLACEHOLDER

  const hover =
    activeImages.back ||
    activeImages.combo ||
    product.images?.back ||
    product.images?.combo ||
    front

  const quickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const defaultSize =
      product.sizes?.includes('M')
        ? 'M'
        : product.sizes?.[0]

    addItem(
      {
        ...product,
        images: {
          ...product.images,
          front,
        },
      },
      defaultSize,
      selectedColor
    )
  }

  return (
    <article className="group">
      <Link
        to={`/product/${product.slug}`}
        className="block"
      >
        {/* image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <img
            src={front}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-4 transition duration-700 group-hover:opacity-0 group-hover:scale-[1.015]"
          />

          <img
            src={hover}
            alt={`${product.name} alternate`}
            className="absolute inset-0 h-full w-full object-contain p-4 opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.015]"
          />

          {/* labels */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.newArrival && (
              <span className="bg-white px-2 py-1 text-[9px] uppercase tracking-[0.2em] shadow-sm">
                New Drop
              </span>
            )}

            {product.bestseller && (
              <span className="bg-black px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                Best Seller
              </span>
            )}
          </div>

          {/* quick add */}
          <button
            onClick={quickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg opacity-0 transition group-hover:opacity-100 hover:scale-105"
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.7}
            />
          </button>
        </div>

        {/* text */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[12px] font-medium uppercase leading-5 tracking-[0.14em]">
              {product.name}
            </h3>

            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              {product.collection}
            </p>
          </div>

          <p className="shrink-0 text-[12px] font-medium tracking-tight">
            {product.price} dh
          </p>
        </div>

        {/* split swatches */}
        {product.colors?.length > 0 && (
          <div className="mt-3 flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedColor(color.name)
                }}
                aria-label={color.name}
                title={color.name}
                className={`h-5 w-5 overflow-hidden rounded-full border transition ${
                  selectedColor === color.name
                    ? 'border-black ring-1 ring-black ring-offset-2'
                    : 'border-neutral-300 hover:border-black'
                }`}
              >
                <span className="flex h-full w-full">
                  <span
                    className="h-full w-1/2"
                    style={{
                      backgroundColor: color.hex,
                    }}
                  />

                  <span
                    className="h-full w-1/2"
                    style={{
                      backgroundColor:
                        color.accent || color.hex,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}