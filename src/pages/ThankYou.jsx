import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useTranslation } from '../i18n/useTranslation'

export default function ThankYou() {
  const { t } = useTranslation()
  const [order, setOrder] = useState(null)
  const clearCart = useCartStore((state) => state.clearCart)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    const savedOrder = localStorage.getItem('engoriz-last-order')

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder))
    }

    clearCart()
  }, [clearCart])

  if (!order) {
    return (
      <main className="min-h-screen bg-white px-5 py-16">
        <p className="text-center text-sm text-neutral-500">Loading order...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-5 py-14 md:px-10">
      <div className="mx-auto max-w-3xl">
        <section className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-black">
            <Check size={34} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              {t('thankYou.confirmation')} #{order.orderId || order.id || 'ENGORIZ'}
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight">
              {t('thankYou.title')}
            </h1>
          </div>
        </section>

        <p className="mt-8 text-sm leading-7 text-neutral-500">
          {t('thankYou.text')}
        </p>

        <section className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <h2 className="text-sm font-black uppercase tracking-[0.22em]">
            {t('thankYou.summary')}
          </h2>

          <div className="mt-5 space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold uppercase leading-5">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {item.color || 'Black'} · Size {item.size} · Qty{' '}
                    {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-medium">
                  MAD {(item.price * item.quantity).toLocaleString()}.00
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-between border-t border-neutral-200 pt-5 text-sm">
            <span className="text-neutral-500">{t('thankYou.total')}</span>
            <span className="font-semibold">
              MAD {order.total.toLocaleString()}.00
            </span>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/track-order"
            className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-[11px] font-semibold uppercase tracking-[0.25em] !text-white transition hover:opacity-90"
          >
            {t('thankYou.track')}
          </Link>

          <Link
            to="/shop"
            className="inline-flex h-14 items-center justify-center rounded-full border border-black bg-white px-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-neutral-50"
          >
            {t('thankYou.continue')}
          </Link>
        </div>
      </div>
    </main>
  )
}