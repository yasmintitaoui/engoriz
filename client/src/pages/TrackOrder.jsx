import { useMemo, useState } from 'react'
import {
  Search,
  Check,
  PackageCheck,
  ClipboardCheck,
  Factory,
  Truck,
  Home,
  XCircle,
} from 'lucide-react'
import { API_URL } from '../lib/api'
import { useTranslation } from '../i18n/useTranslation'

const statusSteps = [
  {
    key: 'received',
    label: 'Order received',
    description: 'We received your order.',
    icon: ClipboardCheck,
  },
  {
    key: 'confirmed',
    label: 'Confirmed',
    description: 'Your order details are confirmed.',
    icon: PackageCheck,
  },
  {
    key: 'production',
    label: 'In production',
    description: 'Your tee is being prepared.',
    icon: Factory,
  },
  {
    key: 'shipped',
    label: 'Shipped',
    description: 'Your order is with delivery.',
    icon: Truck,
  },
  {
    key: 'delivered',
    label: 'Delivered',
    description: 'Your order has arrived.',
    icon: Home,
  },
]

const statusMap = {
  new: 'received',
  received: 'received',
  confirmed: 'confirmed',
  production: 'production',
  processing: 'production',
  ready: 'production',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
}

export default function TrackOrder() {
  const { t } = useTranslation()

  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const currentStatus = statusMap[order?.status] || 'received'

  const currentStepIndex = useMemo(() => {
    return statusSteps.findIndex((step) => step.key === currentStatus)
  }, [currentStatus])

  const handleTrack = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const res = await fetch(`${API_URL}/api/orders`)
      const data = await res.json()

      const cleanedId = orderId.trim().toUpperCase()
      const cleanedPhone = phone.replace(/\s/g, '')

      const found = data.orders?.find((item) => {
        const itemId = item.id?.toUpperCase()
        const itemPhone = item.customer?.phone?.replace(/\s/g, '')

        return itemId === cleanedId && itemPhone === cleanedPhone
      })

      if (!found) {
        setError('No order found. Check your order number and phone.')
        return
      }

      setOrder(found)
    } catch (err) {
      console.error(err)
      setError('Could not track order. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white px-5 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <section className="text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
            ENGORIZ Orders
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
            {t('nav.trackOrder')}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500">
            Enter your order number and phone number exactly as used at checkout.
          </p>
        </section>

        <form
          onSubmit={handleTrack}
          className="mx-auto mt-10 max-w-3xl rounded-3xl border border-neutral-200 bg-neutral-50 p-5 md:p-7"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <input
              required
              placeholder="Order number, e.g. ENG-SS26-4821"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="h-14 rounded-xl border border-neutral-300 bg-white px-4 text-sm uppercase outline-none focus:border-black"
            />

            <input
              required
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none focus:border-black"
            />

            <button
              disabled={loading}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-black px-7 text-sm font-semibold !text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <Search size={16} />
              {loading ? 'Checking...' : 'Track'}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </form>

        {order && (
          <section className="mt-12 rounded-[32px] border border-neutral-200 bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.04)] md:p-8">
            <div className="flex flex-col gap-5 border-b border-neutral-200 pb-7 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Order number
                </p>

                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                  {order.id}
                </h2>

                <p className="mt-3 text-sm text-neutral-500">
                  {order.customer?.fullName} · {order.customer?.city}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {order.customer?.phone}
                </p>
              </div>

              <div className="md:text-right">
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Total
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  MAD {order.total?.toLocaleString()}.00
                </p>

                <p className="mt-3 inline-flex rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  {order.status || 'received'}
                </p>
              </div>
            </div>

            {currentStatus === 'cancelled' ? (
              <div className="mt-8 flex gap-4 rounded-2xl bg-red-50 p-5 text-red-700">
                <XCircle className="shrink-0" size={22} />
                <div>
                  <p className="font-semibold">Order cancelled</p>
                  <p className="mt-1 text-sm">
                    This order has been cancelled. Contact ENGORIZ if this looks
                    wrong.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="grid gap-5 md:grid-cols-5">
                  {statusSteps.map((step, index) => {
                    const active = index <= currentStepIndex
                    const Icon = step.icon

                    return (
                      <div
                        key={step.key}
                        className={`rounded-2xl border p-4 transition ${
                          active
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-200 bg-white text-neutral-400'
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                            active
                              ? 'border-white/40 bg-white text-black'
                              : 'border-neutral-300'
                          }`}
                        >
                          {active ? <Check size={16} /> : <Icon size={17} />}
                        </div>

                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                          {step.label}
                        </p>

                        <p
                          className={`mt-2 text-xs leading-5 ${
                            active ? 'text-white/70' : 'text-neutral-400'
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <p className="mt-6 text-sm leading-7 text-neutral-500">
                  Since ENGORIZ pieces are made by demand, production starts
                  after confirmation. We collaborate with OzoneExpress for
                  express and professional shipping across Morocco.
                </p>
              </div>
            )}

            <div className="mt-10 grid gap-8 border-t border-neutral-200 pt-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Items
                </p>

                <div className="mt-5 space-y-5">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
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
                          {item.color || 'Black'} · {item.fit || 'Regular'} ·
                          Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-medium">
                        MAD {(item.price * item.quantity).toLocaleString()}.00
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Delivery details
                </p>

                <div className="mt-5 rounded-2xl bg-neutral-50 p-5 text-sm leading-7 text-neutral-600">
                  <p>{order.customer?.address}</p>

                  {order.customer?.apartment && (
                    <p>{order.customer.apartment}</p>
                  )}

                  <p>{order.customer?.city}, Morocco</p>

                  {order.customer?.note && (
                    <p className="mt-4 border-t border-neutral-200 pt-4">
                      Note: {order.customer.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}