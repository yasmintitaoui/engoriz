import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, Trash2 } from 'lucide-react'
import { API_URL } from '../../lib/api'

const statuses = [
  'received',
  'confirmed',
  'production',
  'ready',
  'shipped',
  'delivered',
  'cancelled',
]

const statusStyles = {
  received: 'bg-neutral-100 text-neutral-700',
  confirmed: 'bg-blue-50 text-blue-700',
  production: 'bg-yellow-50 text-yellow-700',
  ready: 'bg-indigo-50 text-indigo-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
  new: 'bg-neutral-100 text-neutral-700',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`)
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((order) =>
        ['received', 'new', 'confirmed', 'production', 'ready'].includes(
          order.status
        )
      ).length,
      shipped: orders.filter((order) => order.status === 'shipped').length,
      revenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    }
  }, [orders])

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error('Failed to update status')

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      )
    } catch (error) {
      console.error(error)
      alert('Could not update order status.')
    }
  }

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Delete this order?')) return

    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete order')

      setOrders((current) => current.filter((order) => order.id !== orderId))
    } catch (error) {
      console.error(error)
      alert('Could not delete order.')
    }
  }

  return (
    <main className="min-h-screen bg-white px-5 py-12 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
              ENGORIZ Admin
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">
              Dashboard
            </h1>
          </div>

          <button
            onClick={fetchOrders}
            className="flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] !text-white transition hover:opacity-90"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Total Orders
            </p>
            <h3 className="mt-3 text-3xl font-black">{stats.total}</h3>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Active Orders
            </p>
            <h3 className="mt-3 text-3xl font-black">{stats.pending}</h3>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Shipped
            </p>
            <h3 className="mt-3 text-3xl font-black">{stats.shipped}</h3>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Revenue
            </p>
            <h3 className="mt-3 text-3xl font-black">
              MAD {stats.revenue.toLocaleString()}
            </h3>
          </div>
        </div>

        {loading ? (
          <p className="mt-10 text-neutral-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-10 text-neutral-500">No orders yet.</p>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order) => {
              const normalizedStatus =
                order.status === 'new'
                  ? 'received'
                  : order.status || 'received'

              return (
                <article
                  key={order.id}
                  className="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.05)] md:p-7"
                >
                  <div className="flex flex-col gap-5 border-b border-neutral-200 pb-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                        {order.id}
                      </p>

                      <h2 className="mt-2 text-xl font-black uppercase">
                        {order.customer?.fullName || 'Customer'}
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        {order.customer?.phone} · {order.customer?.city}
                      </p>

                      {order.customer?.email && (
                        <p className="mt-1 text-sm text-neutral-500">
                          {order.customer.email}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 md:items-end">
                      <p className="text-2xl font-semibold">
                        MAD {order.total?.toLocaleString()}.00
                      </p>

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                          statusStyles[normalizedStatus] ||
                          statusStyles.received
                        }`}
                      >
                        {normalizedStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                        Items
                      </p>

                      <div className="mt-4 space-y-4">
                        {order.items?.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain p-1"
                              />
                            </div>

                            <div>
                              <p className="text-sm font-semibold uppercase">
                                {item.name}
                              </p>

                              <p className="mt-1 text-sm text-neutral-500">
                                {item.color || 'Black'} · Size {item.size} · Qty{' '}
                                {item.quantity}
                              </p>

                              <p className="mt-1 text-sm">
                                MAD{' '}
                                {(item.price * item.quantity).toLocaleString()}
                                .00
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                        Delivery
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-neutral-600">
                        <p>{order.customer?.address}</p>

                        {order.customer?.apartment && (
                          <p>{order.customer.apartment}</p>
                        )}

                        {order.customer?.postalCode && (
                          <p>Postal code: {order.customer.postalCode}</p>
                        )}

                        {order.customer?.note && (
                          <p>Note: {order.customer.note}</p>
                        )}

                        <p>{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-neutral-200 pt-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(order.id, status)}
                          className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition ${
                            normalizedStatus === status
                              ? 'border-black bg-black !text-white'
                              : 'border-neutral-300 text-neutral-500 hover:border-black hover:text-black'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="flex w-fit items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}