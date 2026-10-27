import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 md:px-10">
      <div className="mx-auto flex min-h-[65vh] max-w-4xl flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] uppercase tracking-[0.4em] text-neutral-400"
        >
          Page Not Found
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-4 font-display text-[clamp(7rem,22vw,16rem)] uppercase leading-none tracking-[-0.04em] text-black"
        >
          404
        </motion.h1>

        <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500">
          This page doesn’t exist or has been moved. Return to the drop.
        </p>

        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
          <Link
            to="/shop"
            className="rounded-full bg-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.28em] !text-white transition hover:opacity-90"
          >
            Shop the Drop
          </Link>

          <Link
            to="/"
            className="border-b border-black pb-1 text-[12px] uppercase tracking-[0.28em] transition hover:opacity-50"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  )
}