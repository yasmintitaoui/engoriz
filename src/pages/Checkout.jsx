import { useMemo, useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'

import products from '../data/products'
import { API_URL } from '../lib/api'
import { safeSetItem } from '../lib/storage'

import CitySelect from '../components/checkout/CitySelect'
import { useCartStore } from '../store/cartStore'
import { useTranslation } from '../i18n/useTranslation'

const fieldClass =
  'h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition placeholder:text-neutral-400 focus:border-black'

const textareaClass =
  'w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-4 text-[15px] outline-none transition placeholder:text-neutral-400 focus:border-black'

function normalizeCheckoutItem(item) {
  const product =
    products.find((entry) => entry.slug === item.slug) ||
    products.find((entry) => String(entry.id) === String(item.id)) ||
    products.find((entry) => String(entry.id) === String(item.productId)) ||
    null

  return {
    ...item,
    id: product?.id ?? item.id ?? 'unknown',
    slug: product?.slug ?? item.slug ?? '',
    name: product?.name ?? item.name ?? 'Product',
    price: Number(item.price) || Number(product?.price) || 0,
    fit: item.fit || 'Regular',
    quantity: Math.max(1, Number(item.quantity) || 1),
    color: item.color || product?.colors?.[0]?.name || null,
    image: item.image || product?.images?.front || '/favicon.ico',
  }
}

function isValidMoroccanPhone(phone) {
  const clean = String(phone || '').replace(/\s/g, '')
  return /^(0|\+212)(5|6|7)[0-9]{8}$/.test(clean)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}

async function parseJsonResponse(response) {
  const text = await response.text()

  if (!text) return {}

  try {
    return JSON.parse(text)
  } catch {
    return { error: 'Unexpected server response.' }
  }
}

export default function Checkout() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    items,
    getTotalPrice,
    getDiscount,
    getFinalPrice,
    getItemCount,
  } = useCartStore()

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    phone: '',
    note: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const subtotal = getTotalPrice()
  const discount = getDiscount()
  const discountedSubtotal = getFinalPrice()

  const shipping = form.city === 'Casablanca' ? 20 : 35

  const total = discountedSubtotal + shipping

  const itemCount = getItemCount()

  const fullName = useMemo(
    () => `${form.firstName} ${form.lastName}`.trim(),
    [form.firstName, form.lastName]
  )

  if (items.length === 0) return <Navigate to="/cart" replace />

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const validateForm = () => {
    if (!items.length) return 'Your cart is empty.'

    if (!isValidEmail(form.email))
      return 'Please enter a valid email address.'

    if (!form.firstName.trim() || !form.lastName.trim())
      return 'Please enter your full name.'

    if (!form.address.trim())
      return 'Please enter your delivery address.'

    if (!form.city) return 'Please select your city.'

    if (!isValidMoroccanPhone(form.phone))
      return 'Please enter a valid Moroccan phone number.'

    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const order = {
      customer: {
        fullName,
        email: form.email.trim(),
        phone: String(form.phone || '').replace(/\s/g, ''),
        city: form.city,
        address: form.address.trim(),
        apartment: form.apartment.trim(),
        postalCode: form.postalCode.trim(),
        note: form.note.trim(),
      },

      items: items
        .map(normalizeCheckoutItem)
        .filter((item) => item && item.name && item.price > 0),

      subtotal,
      discount,
      shipping,
      total,

      paymentMethod: 'Cash on Delivery',
      createdAt: new Date().toISOString(),
    }

    if (!order.items.length) {
      setError('Your cart is empty or contains invalid items.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
        signal: controller.signal,
      })

      const data = await parseJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      const lastOrder = {
        ...order,
        orderId: data.orderId,
        status: 'received',
      }

      safeSetItem('engoriz-last-order', JSON.stringify(lastOrder), 'local')
      window.dispatchEvent(new Event('engoriz-order-placed'))
      navigate('/thank-you')
    } catch (err) {
      console.error(err)

      const message =
        err instanceof Error && err.name === 'AbortError'
          ? 'The order request timed out. Please try again.'
          : err instanceof Error && err.message
            ? err.message
            : 'Something went wrong while placing your order. Please try again.'

      setError(message)
    } finally {
      clearTimeout(timeoutId)
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.72fr]">
        <section className="px-5 py-10 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/cart"
              className="mb-8 inline-block text-[12px] uppercase tracking-[0.25em] text-neutral-400 transition hover:text-black"
            >
              ← {t('checkout.backToCart')}
            </Link>

            <form onSubmit={handleSubmit} className="space-y-10">
              <section>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h1 className="text-2xl font-black tracking-tight">
                    {t('checkout.contact')}
                  </h1>

                  <p className="text-sm text-neutral-500">
                    {t('checkout.cod')}
                  </p>
                </div>

                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={fieldClass}
                />
              </section>

              <section>
                <h2 className="mb-5 text-2xl font-black tracking-tight">
                  {t('checkout.delivery')}
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-neutral-300 px-4 py-3">
                    <p className="text-xs text-neutral-500">
                      {t('checkout.country')}
                    </p>

                    <p className="mt-1 text-[15px]">
                      {t('checkout.morocco')}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder={t('checkout.firstName')}
                      value={form.firstName}
                      onChange={(e) =>
                        updateField('firstName', e.target.value)
                      }
                      className={fieldClass}
                    />

                    <input
                      required
                      placeholder={t('checkout.lastName')}
                      value={form.lastName}
                      onChange={(e) =>
                        updateField('lastName', e.target.value)
                      }
                      className={fieldClass}
                    />
                  </div>

                  <input
                    required
                    placeholder={t('checkout.address')}
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className={fieldClass}
                  />

                  <input
                    placeholder={t('checkout.apartment')}
                    value={form.apartment}
                    onChange={(e) => updateField('apartment', e.target.value)}
                    className={fieldClass}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      placeholder={t('checkout.postalCode')}
                      value={form.postalCode}
                      onChange={(e) =>
                        updateField('postalCode', e.target.value)
                      }
                      className={fieldClass}
                    />

                    <CitySelect
                      value={form.city}
                      onChange={(city) => updateField('city', city)}
                      className={fieldClass}
                    />
                  </div>

                  <input
                    required
                    type="tel"
                    placeholder={t('checkout.phone')}
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={fieldClass}
                  />

                  <textarea
                    rows={3}
                    placeholder={t('checkout.note')}
                    value={form.note}
                    onChange={(e) => updateField('note', e.target.value)}
                    className={textareaClass}
                  />
                </div>
              </section>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-16 w-full rounded-xl bg-black text-sm font-semibold !text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? t('checkout.completing')
                  : t('checkout.completeOrder')}
              </button>
            </form>
          </div>
        </section>

        <aside className="border-l border-neutral-200 bg-neutral-50 px-5 py-10 md:px-10 lg:px-14">
          <div className="sticky top-10 mx-auto max-w-xl">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${item.fit}`}
                  className="flex gap-4"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="flex flex-1 justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium leading-5">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {item.color || 'Black'} ·{' '}
                        {item.fit || 'Regular'} · {item.size} · Qty{' '}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-medium">
                      MAD {(item.price * item.quantity).toLocaleString()}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-4">
              {itemCount >= 5 ? (
                <p className="text-sm font-medium text-green-700">
                  20% OFF unlocked on 5+ articles.
                </p>
              ) : (
                <p className="text-sm text-green-700">
                  Add {5 - itemCount} more article
                  {5 - itemCount === 1 ? '' : 's'} to unlock 20% OFF.
                </p>
              )}
            </div>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <span>{t('checkout.subtotal')}</span>

                <span>MAD {subtotal.toLocaleString()}.00</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>5+ Articles Discount</span>

                  <span>- MAD {discount.toLocaleString()}.00</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('checkout.shipping')}</span>

                <span>MAD {shipping}.00</span>
              </div>

              <div className="flex justify-between pt-3 text-2xl font-black">
                <span>{t('checkout.total')}</span>

                <span>MAD {total.toLocaleString()}.00</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}