import { Link } from 'react-router-dom'
import { User, PackageSearch } from 'lucide-react'

export default function Account() {
  return (
    <main className="min-h-screen bg-white px-5 py-16 md:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
          ENGORIZ Account
        </p>

        <h1 className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
          Account
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-[var(--color-paper)] p-6">
            <User size={24} strokeWidth={1.6} />

            <h2 className="mt-5 text-lg font-black uppercase">
              Member Area
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Accounts are coming soon. For now, checkout works without login.
            </p>
          </div>

          <Link
            to="/track-order"
            className="rounded-3xl border border-neutral-200 bg-white p-6 transition hover:bg-[var(--color-paper)]"
          >
            <PackageSearch size={24} strokeWidth={1.6} />

            <h2 className="mt-5 text-lg font-black uppercase">
              Track Order
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Check your order using your order number and phone.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}