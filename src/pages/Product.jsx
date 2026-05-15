import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ShoppingCart, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'
import products from '../data/products'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/product/ProductCard'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="%23ffffff"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="22" fill="%23999999" letter-spacing="8">ENGORIZ</text></svg>'

const sizeChart = {
  Regular: [
    { size: 'S', a: '65', b: '49', c: '48', d: '23' },
    { size: 'M', a: '67', b: '52', c: '50', d: '24' },
    { size: 'L', a: '69', b: '54', c: '53', d: '26' },
    { size: 'XL', a: '71', b: '57', c: '56', d: '28' },
    { size: 'XXL', a: '74', b: '59', c: '58', d: '30' },
  ],
  Cropped: [
    { size: 'S', a: '58', b: '49', c: '48', d: '23' },
    { size: 'M', a: '61', b: '52', c: '50', d: '24' },
    { size: 'L', a: '63', b: '54', c: '53', d: '26' },
    { size: 'XL', a: '65', b: '57', c: '56', d: '28' },
    { size: 'XXL', a: '67', b: '59', c: '58', d: '30' },
  ],
}

function InfoRow({ title, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[12px] font-medium uppercase tracking-[0.24em]">
          {title}
        </span>

        <ChevronDown
          size={17}
          strokeWidth={1.6}
          className={`transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-7 text-neutral-500">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SizeGuideModal({ open, onClose, selectedFit }) {
  const { t } = useTranslation()
  const rows = sizeChart[selectedFit] || sizeChart.Regular

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]">
          <motion.button
            aria-label="Close size guide"
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
                  ENGORIZ
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">
                  {selectedFit} {t('product.sizeGuide')}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-neutral-100"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Measurements are in centimeters. A = length, B = chest, C =
              shoulder, D = sleeve.
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-white text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  <tr>
                    <th className="px-4 py-4 font-medium">Size</th>
                    <th className="px-4 py-4 font-medium">A Length</th>
                    <th className="px-4 py-4 font-medium">B Chest</th>
                    <th className="px-4 py-4 font-medium">C Shoulder</th>
                    <th className="px-4 py-4 font-medium">D Sleeve</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200">
                  {rows.map((row) => (
                    <tr key={row.size}>
                      <td className="px-4 py-4 font-medium">{row.size}</td>
                      <td className="px-4 py-4 text-neutral-500">{row.a}</td>
                      <td className="px-4 py-4 text-neutral-500">{row.b}</td>
                      <td className="px-4 py-4 text-neutral-500">{row.c}</td>
                      <td className="px-4 py-4 text-neutral-500">{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Product() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug])

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedFit, setSelectedFit] = useState('Regular')
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedImage, setSelectedImage] = useState('front')
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const addItem = useCartStore((state) => state.addItem)

  const activeImages = useMemo(() => {
    if (!product) return {}

    if (product.imagesByColor && selectedColor) {
      return product.imagesByColor[selectedColor] || product.images
    }

    return product.images || {}
  }, [product, selectedColor])

  const imageKeys = useMemo(() => {
    return Object.keys(activeImages).filter((key) => activeImages[key])
  }, [activeImages])

  const relatedProducts = useMemo(() => {
    if (!product) return []

    return products
      .filter((item) => item.id !== product.id && item.featured)
      .slice(0, 4)
  }, [product])

  useEffect(() => {
    setSelectedSize(null)
    setSelectedFit(product?.fits?.[0] || 'Regular')
    setSelectedColor(product?.colors?.[0]?.name || null)
    setSelectedImage('front')
    setError('')
    setAdded(false)
    setSizeGuideOpen(false)
  }, [slug, product])

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 text-center">
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-neutral-400">
            Product not found
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block border-b border-black pb-1 text-[12px] uppercase tracking-[0.25em]"
          >
            {t('nav.shop')}
          </Link>
        </div>
      </main>
    )
  }

  const currentImage =
    activeImages[selectedImage] || activeImages.front || PLACEHOLDER

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(t('product.selectSize'))
      return
    }

    addItem(
      {
        ...product,
        images: {
          ...product.images,
          front: activeImages.front || product.images.front,
        },
      },
      selectedSize,
      selectedColor,
      selectedFit
    )

    setError('')
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <main className="min-h-screen bg-white">
      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        selectedFit={selectedFit}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <section>
          <div className="overflow-hidden bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${selectedColor}-${selectedImage}`}
                src={currentImage}
                alt={`${product.name} product image`}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="aspect-[3/4] w-full object-contain p-4"
              />
            </AnimatePresence>
          </div>

          {imageKeys.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {imageKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedImage(key)}
                  className={`h-24 w-20 shrink-0 overflow-hidden border bg-white transition ${
                    selectedImage === key
                      ? 'border-black'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View ${key} image`}
                >
                  <img
                    src={activeImages[key]}
                    alt={`${product.name} ${key}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="lg:sticky lg:top-12 lg:h-fit">
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
            {product.collection}
          </p>

          <h1 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-lg font-semibold tracking-tight">
              {product.price.toLocaleString()} dh
            </p>

            {product.compareAt && (
              <p className="text-sm text-neutral-400 line-through">
                {product.compareAt.toLocaleString()} dh
              </p>
            )}
          </div>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {t('product.cod')}
          </p>

          {product.colors?.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] uppercase tracking-[0.22em]">
                  {t('product.color')}
                </p>

                <p className="text-sm text-neutral-500">{selectedColor}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name)
                      setSelectedImage('front')
                      setError('')
                    }}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                    className={`h-8 w-8 overflow-hidden rounded-full border transition ${
                      selectedColor === color.name
                        ? 'border-black ring-2 ring-black ring-offset-2'
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
                        style={{ backgroundColor: color.accent || color.hex }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.fits?.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] uppercase tracking-[0.22em]">Fit</p>
                <p className="text-sm text-neutral-500">{selectedFit}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {product.fits.map((fit) => (
                  <button
                    key={fit}
                    onClick={() => {
                      setSelectedFit(fit)
                      setError('')
                    }}
                    className={`h-12 border text-sm font-medium uppercase transition ${
                      selectedFit === fit
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white hover:border-black'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[12px] uppercase tracking-[0.22em]">
                {t('product.size')}
              </p>

              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 underline underline-offset-4 transition hover:text-black"
              >
                {selectedFit} {t('product.sizeGuide')}
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size)
                    setError('')
                  }}
                  className={`h-12 border text-sm font-medium uppercase transition ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-300 bg-white hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full text-[12px] font-medium uppercase tracking-[0.28em] transition ${
              added
                ? 'border border-black bg-white text-black'
                : 'bg-black !text-white hover:opacity-90'
            }`}
          >
            <ShoppingCart size={17} strokeWidth={1.6} />
            {added ? t('product.added') : t('product.addToCart')}
          </button>

          <div className="mt-10 border-b border-neutral-200">
            <InfoRow title={t('product.description')}>
              <p>{product.description}</p>
            </InfoRow>

            <InfoRow title={t('product.details')}>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index}>— {detail}</li>
                ))}
              </ul>
            </InfoRow>

            <InfoRow title="Shipping & Returns">
              <div className="space-y-3">
                <p>
                  We collaborate with OzoneExpress for express and professional
                  shipping across Morocco.
                </p>
                <p>Orders are made by demand after confirmation.</p>
                <p>
                  Delivery time depends on your city and confirmation timing.
                </p>
                <p>
                  Exchanges are accepted only for size issues or damaged items,
                  and must be requested shortly after delivery.
                </p>
              </div>
            </InfoRow>

            <InfoRow title="Product Care">
              <div className="space-y-3">
                <p>Machine wash with similar colors.</p>
                <p>Wash inside out.</p>
                <p>Use a gentle cycle at max 30°C.</p>
                <p>Tumble dry low.</p>
                <p>Use only non-chlorine bleach when necessary.</p>
                <p>Avoid dry cleaning.</p>
                <p>Do not iron.</p>
              </div>
            </InfoRow>
          </div>
        </section>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
                  {t('product.moreFrom')}
                </p>

                <h2 className="mt-4 font-display text-5xl uppercase md:text-7xl">
                  {t('product.youMayAlsoLike')}
                </h2>
              </div>

              <Link
                to="/shop"
                className="hidden border-b border-black pb-1 text-[11px] uppercase tracking-[0.28em] transition hover:opacity-50 md:block"
              >
                {t('product.viewAll')}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}