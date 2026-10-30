import { memo, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="%23ffffff"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="22" fill="%23999999" letter-spacing="8">ENGORIZ</text></svg>'

function ProductCard({ product, priority = false }) {
  const addItem = useCartStore((state) => state.addItem)

  const defaultColor = product.colors?.[0]?.name || null
  const [selectedColor, setSelectedColor] = useState(defaultColor)

  useEffect(() => {
    setSelectedColor(defaultColor)
  }, [defaultColor])

  const activeImages = useMemo(() => {
    if (product.imagesByColor && selectedColor) {
      return product.imagesByColor[selectedColor] || product.images || {}
    }

    return product.images || {}
  }, [product, selectedColor])

  const front = activeImages.front || product.images?.front || PLACEHOLDER
  const hover = activeImages.back || activeImages.front || product.images?.back || front

  const quickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const defaultSize = product.sizes?.includes('M')
      ? 'M'
      : product.sizes?.[0]

    const defaultFit = product.category === 'hoodies'
      ? null
      : product.fits?.includes('Regular')
        ? 'Regular'
        : product.fits?.[0] || 'Regular'

    if (!defaultSize) return

    addItem(
      {
        ...product,
        images: {
          ...product.images,
          front,
        },
      },
      defaultSize,
      selectedColor,
      defaultFit
    )
  }

  return (
    <article className="group">
      <Link
        to={`/product/${product.slug}`}
        className="block focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
      >
        <div className="relative aspect-4/5 overflow-hidden bg-neutral-50">
          <img
            src={front}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER
            }}
            className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.015] group-focus-within:scale-[1.015] md:group-hover:opacity-0 md:group-focus-within:opacity-0"
          />

          <img
            src={hover}
            alt={`${product.name} alternate`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={(e) => {
              e.currentTarget.src = front
            }}
            className="absolute inset-0 hidden h-full w-full object-contain opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-[1.015] md:block"
          />

          {(product.new || product.newArrival || product.limited) && (
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
              {product.new && (
                <span className="bg-black px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                  New
                </span>
              )}

              {product.limited && (
                <span className="bg-black px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                  Limited Edition
                </span>
              )}
            </div>
          )}

          {product.sizes?.length > 0 && (
            <button
              onClick={quickAdd}
              aria-label={`Add ${product.name} to cart`}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center border border-black bg-white opacity-100 transition hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              <ShoppingBag size={16} strokeWidth={1.7} />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4 sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-[11px] uppercase leading-5 tracking-[0.08em] text-black transition group-hover:text-neutral-600 sm:text-xs sm:tracking-[0.12em]">
              {product.name}
            </h3>

            <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-neutral-400">
              {product.collection}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-[0.08em] text-neutral-600 sm:text-[11px] sm:tracking-[0.12em]">
              MAD {product.price}
            </p>
            {product.compareAt && (
              <p className="mt-1 text-[9px] text-neutral-400 sm:text-[10px]">
                <s>MAD {product.compareAt}</s>
              </p>
            )}
          </div>
        </div>

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
                    style={{ backgroundColor: color.hex }}
                  />

                  <span
                    className="h-full w-1/2"
                    style={{
                      backgroundColor: color.accent || color.hex,
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

export default memo(ProductCard)