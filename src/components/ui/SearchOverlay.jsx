import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import products from '../../data/products'

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const value = query.trim().toLowerCase()

    if (!value) return products.slice(0, 4)

    return products.filter((product) =>
      product.name.toLowerCase().includes(value)
    )
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]">
          <motion.button
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-8 w-[calc(100%-32px)] max-w-3xl -translate-x-1/2 rounded-[28px] bg-white p-5 shadow-2xl md:p-7"
          >
            <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
              <Search size={20} strokeWidth={1.5} />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ENGORIZ"
                className="h-12 flex-1 bg-transparent text-xl outline-none placeholder:text-neutral-300"
              />

              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-2 transition hover:bg-neutral-100"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-400">
                {query ? 'Results' : 'Suggested'}
              </p>

              <div className="mt-4 space-y-3">
                {results.length === 0 ? (
                  <p className="py-8 text-sm text-neutral-500">
                    No products found.
                  </p>
                ) : (
                  results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-[var(--color-paper)]"
                    >
                      <div className="h-20 w-16 overflow-hidden bg-neutral-100">
                        <img
                          src={product.images?.front}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">
                          {product.price.toLocaleString()} dh
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}