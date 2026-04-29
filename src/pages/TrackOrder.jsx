import { useState } from 'react'
import { Search, Package, Truck, CheckCircle2 } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'

import { API_URL } from '../lib/api' 

const STATUS_STEPS = {
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
}

export default function TrackOrder() {
  const { t } = useTranslation()

  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const steps = [
    {
      key: 'confirmed',
      label:
        t('track.confirmed') || 'Confirmed',
      icon: Package,
    },
    {
      key: 'processing',
      label:
        t('track.processing') || 'Processing',
      icon: Package,
    },
    {
      key: 'shipped',
      label:
        t('track.shipped') || 'Shipped',
      icon: Truck,
    },
    {
      key: 'delivered',
      label:
        t('track.delivered') || 'Delivered',
      icon: CheckCircle2,
    },
  ]

  async function handleTrack(e) {
    e.preventDefault()

    if (!orderId.trim()) {
      setError('Enter your order ID.')
      return
    }

    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const res = await fetch(
        `${API_URL}/api/orders/track/${orderId.trim()}`
      )

      if (!res.ok) throw new Error()

      const data = await res.json()

      if (
        phone &&
        data.customer?.phone &&
        phone.replace(/\s/g,'') !==
        data.customer.phone.replace(/\s/g,'')
      ) {
        throw new Error()
      }

      setOrder(data)
    } catch {
      setError(
        'Order not found. Check your order number and phone.'
      )
    } finally {
      setLoading(false)
    }
  }

  const currentStep =
    STATUS_STEPS[order?.status] || 1

  return (
    <main className="min-h-screen bg-white px-5 py-14 md:px-10">
      <div className="mx-auto max-w-4xl">

        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
            ENGORIZ
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
            {t('nav.trackOrder')}
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-neutral-500">
            {t('track.subtitle') ||
              'Enter your order ID to check production and delivery progress.'}
          </p>
        </div>


        <form
          onSubmit={handleTrack}
          className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 p-6 md:p-10"
        >
          <div className="grid gap-4 md:grid-cols-2">

            <input
              value={orderId}
              onChange={(e)=>setOrderId(e.target.value)}
              placeholder={
                t('track.orderId') || 'Order ID'
              }
              className="h-14 rounded-xl border border-neutral-300 px-4 outline-none focus:border-black"
            />

            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder={
                t('track.phone') ||
                'Phone (optional)'
              }
              className="h-14 rounded-xl border border-neutral-300 px-4 outline-none focus:border-black"
            />

          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-[11px] font-semibold uppercase tracking-[0.28em] !text-white transition hover:opacity-90 disabled:opacity-50"
          >
            <Search size={17}/>
            {loading
              ? (t('track.searching') || 'Searching...')
              : (t('track.trackButton') || 'Track Order')}
          </button>
        </form>



        {order && (
          <section className="mx-auto mt-12 max-w-4xl">

            <div className="rounded-3xl border border-neutral-200 p-6 md:p-10">

              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                    Order
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    #{order.orderId}
                  </h2>

                  <p className="mt-4 text-sm text-neutral-500">
                    {order.customer?.fullName}
                  </p>

                  <p className="text-sm text-neutral-500">
                    {order.customer?.city}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                    Status
                  </p>

                  <p className="mt-3 text-xl font-semibold capitalize">
                    {order.status}
                  </p>
                </div>

              </div>



              <div className="mt-12 grid gap-8 md:grid-cols-4">
                {steps.map((step,index)=>{
                  const active =
                    currentStep >= index+1

                  const Icon=step.icon

                  return(
                    <div key={step.key}>
                      <div
                        className={`
                          mb-4 flex h-14 w-14 items-center justify-center rounded-full border
                          ${
                            active
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-300 text-neutral-300'
                          }
                        `}
                      >
                        <Icon size={22}/>
                      </div>

                      <p
                        className={`
                          text-[11px] uppercase tracking-[0.25em]
                          ${
                            active
                            ? 'text-black'
                            : 'text-neutral-400'
                          }
                        `}
                      >
                        {step.label}
                      </p>
                    </div>
                  )
                })}
              </div>



              <div className="mt-12 border-t border-neutral-200 pt-8">
                <h3 className="mb-6 text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                  Items
                </h3>

                <div className="space-y-5">
                  {order.items?.map((item,index)=>(
                    <div
                      key={index}
                      className="flex items-center justify-between gap-5"
                    >
                      <div>
                        <p className="text-sm font-medium uppercase">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {item.color} · {item.size} · Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-medium">
                        MAD {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </section>
        )}

      </div>
    </main>
  )
}