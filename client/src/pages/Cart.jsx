import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useTranslation } from '../i18n/useTranslation'

export default function Cart() {
  const { t } = useTranslation()
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    getTotalPrice,
  } = useCartStore()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white px-5 py-16 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
            {t('nav.cart')}
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
            {t('cart.empty')}
          </h1>

          <Link
            to="/shop"
            className="mt-8 rounded-full bg-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.28em] !text-white transition hover:opacity-90"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
              {t('nav.cart')}
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">
              {t('nav.cart')}
            </h1>
          </div>

          <Link
            to="/shop"
            className="text-[12px] uppercase tracking-[0.28em] text-neutral-400 transition hover:text-black"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>

        <section className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color ?? 'none'}`}
              className="grid grid-cols-[96px_1fr] gap-5 py-6 sm:grid-cols-[130px_1fr] md:gap-8 md:py-8"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-sm font-medium uppercase leading-6 tracking-[0.14em] md:text-base">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-sm text-neutral-500">
                      {item.size} · {item.color || 'Black'}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    aria-label={`Remove ${item.name}`}
                    className="text-neutral-500 transition hover:text-black"
                  >
                    <Trash2 size={18} strokeWidth={1.6} />
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between">
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

                  <p className="text-sm font-medium tracking-tight text-black md:text-base">
                    {(item.price * item.quantity).toLocaleString()} dh
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-8 flex flex-col gap-6 md:ml-auto md:max-w-md">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
            <p className="text-[12px] uppercase tracking-[0.28em] text-neutral-500">
              {t('checkout.subtotal')}
            </p>

            <p className="text-2xl font-semibold tracking-tight">
              {getTotalPrice().toLocaleString()} dh
            </p>
          </div>

          <p className="text-sm leading-6 text-neutral-500">
            Shipping and cash-on-delivery confirmation are handled at checkout.
          </p>

          <Link
            to="/checkout"
            className="block w-full rounded-full bg-black py-4 text-center text-[12px] font-medium uppercase tracking-[0.32em] !text-white transition hover:opacity-90"
          >
            {t('checkout.completeOrder')}
          </Link>
        </div>
      </div>
    </main>
  )
}