import { useMemo, useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'

import { API_URL } from '../lib/api'

import CitySelect from '../components/checkout/CitySelect'
import { useCartStore } from '../store/cartStore'
import { useTranslation } from '../i18n/useTranslation'

const fieldClass =
  'h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition placeholder:text-neutral-400 focus:border-black'

const textareaClass =
  'w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-4 text-[15px] outline-none transition placeholder:text-neutral-400 focus:border-black'

function isValidMoroccanPhone(phone) {
  const clean = phone.replace(/\s/g, '')
  return /^(0|\+212)(5|6|7)[0-9]{8}$/.test(clean)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Checkout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, getTotalPrice } = useCartStore()

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
  const shipping = form.city === 'Casablanca' ? 20 : 35
  const total = subtotal + shipping

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
    if (!isValidEmail(form.email)) return 'Please enter a valid email address.'
    if (!form.firstName.trim() || !form.lastName.trim()) return 'Please enter your full name.'
    if (!form.address.trim()) return 'Please enter your delivery address.'
    if (!form.city) return 'Please select your city.'
    if (!isValidMoroccanPhone(form.phone)) return 'Please enter a valid Moroccan phone number.'
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

    const order = {
      customer: {
        fullName,
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city,
        address: form.address.trim(),
        apartment: form.apartment.trim(),
        postalCode: form.postalCode.trim(),
        note: form.note.trim(),
      },
      items,
      subtotal,
      shipping,
      total,
      paymentMethod: 'Cash on Delivery',
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to place order')

      localStorage.setItem(
        'engoriz-last-order',
        JSON.stringify({
          ...order,
          orderId: data.orderId,
        })
      )

      navigate('/thank-you')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while placing your order. Please try again.')
    } finally {
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
                    <p className="mt-1 text-[15px]">{t('checkout.morocco')}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder={t('checkout.firstName')}
                      value={form.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className={fieldClass}
                    />

                    <input
                      required
                      placeholder={t('checkout.lastName')}
                      value={form.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
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
                      onChange={(e) => updateField('postalCode', e.target.value)}
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

              <section>
                <h2 className="mb-5 text-2xl font-black tracking-tight">
                  {t('checkout.shippingMethod')}
                </h2>

                <div className="rounded-xl border border-neutral-300 px-5 py-5">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="font-medium">
                        {form.city === 'Casablanca'
                          ? 'Casablanca delivery'
                          : form.city
                            ? 'Morocco delivery'
                            : 'Select city first'}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {t('checkout.cod')}
                      </p>
                    </div>

                    <p className="font-semibold">MAD {shipping}.00</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-2 text-2xl font-black tracking-tight">
                  {t('checkout.payment')}
                </h2>

                <p className="mb-5 text-sm text-neutral-500">
                  {t('checkout.paymentText')}
                </p>

                <div className="rounded-xl border border-black px-5 py-5">
                  {t('checkout.cod')}
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
                {isSubmitting ? t('checkout.completing') : t('checkout.completeOrder')}
              </button>
            </form>
          </div>
        </section>

        <aside className="border-l border-neutral-200 bg-neutral-50 px-5 py-10 md:px-10 lg:px-14">
          <div className="sticky top-10 mx-auto max-w-xl">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color ?? 'none'}`}
                  className="flex gap-4"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="flex flex-1 justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium leading-5">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {item.color || 'Black'} · {item.size} · Qty {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-medium">
                      MAD {(item.price * item.quantity).toLocaleString()}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <input
                placeholder={t('checkout.discountCode')}
                className="h-14 flex-1 rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none focus:border-black"
              />

              <button
                type="button"
                className="h-14 rounded-xl border border-neutral-300 px-6 text-sm font-semibold text-neutral-400"
              >
                {t('checkout.apply')}
              </button>
            </div>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <span>{t('checkout.subtotal')}</span>
                <span>MAD {subtotal.toLocaleString()}.00</span>
              </div>

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