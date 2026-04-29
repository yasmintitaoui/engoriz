import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useTranslation } from '../../i18n/useTranslation'

export default function SideCart() {
  const { t } = useTranslation()

  const {
    items,
    isOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalPrice,
    getItemCount,
  } = useCartStore()

  const count = getItemCount()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            aria-label="Close cart overlay"
            onClick={closeCart}
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-6">
              <div className="flex items-center gap-4">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <h2 className="text-sm font-medium uppercase tracking-[0.35em]">
                  {t('nav.cart')} ({count})
                </h2>
              </div>

              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="transition hover:opacity-50"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                    {t('cart.empty')}
                  </p>

                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="mt-8 rounded-full bg-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.28em] !text-white transition hover:opacity-90"
                  >
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color ?? 'none'}`}
                      className="grid grid-cols-[110px_1fr] gap-6"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium uppercase leading-6 tracking-[0.14em]">
                              {item.name}
                            </p>

                            <p className="mt-1 text-sm text-neutral-500">
                              {item.size} · {item.color || 'Black'}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              removeItem(item.id, item.size, item.color)
                            }
                            aria-label={`Remove ${item.name}`}
                            className="text-neutral-500 transition hover:text-black"
                          >
                            <Trash2 size={17} strokeWidth={1.6} />
                          </button>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex h-10 items-center border border-neutral-300">
                            <button
                              onClick={() =>
                                decreaseQuantity(item.id, item.size, item.color)
                              }
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex h-10 w-10 items-center justify-center transition hover:bg-neutral-100"
                            >
                              <Minus size={14} strokeWidth={1.8} />
                            </button>

                            <span className="flex h-10 w-10 items-center justify-center text-sm">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQuantity(item.id, item.size, item.color)
                              }
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex h-10 w-10 items-center justify-center transition hover:bg-neutral-100"
                            >
                              <Plus size={14} strokeWidth={1.8} />
                            </button>
                          </div>

                          <p className="text-sm font-medium tracking-tight text-black">
                            {(item.price * item.quantity).toLocaleString()} dh
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-neutral-200 px-8 py-7">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.35em] text-neutral-500">
                    {t('checkout.total')}
                  </p>

                  <p className="text-2xl font-semibold tracking-tight text-black">
                    {getTotalPrice().toLocaleString()} dh
                  </p>
                </div>

                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-full bg-black py-4 text-center text-[12px] font-medium uppercase tracking-[0.35em] !text-white transition hover:opacity-90"
                >
                  {t('checkout.completeOrder')}
                </Link>

                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="mt-6 block text-center text-[12px] uppercase tracking-[0.3em] text-neutral-400 transition hover:text-black"
                >
                  {t('cart.continueShopping')}
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}