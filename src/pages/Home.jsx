import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

import rioHero from '../assets/campaign/rio-hero.jpeg'
import editorial01 from '../assets/campaign/editorial-01.webp'

import ProductCard from '../components/product/ProductCard'
import BestSellers from '../components/product/BestSellers'
import products from '../data/products'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.8,
    delay,
    ease: [0.22, 1, 0.36, 1],
  },
})

export default function Home() {
  const { t } = useTranslation()

  return (
    <main className="bg-white">
      <section className="grid min-h-[92svh] grid-cols-1 md:grid-cols-2">
        <div className="relative overflow-hidden bg-black">
          <img
            src={rioHero}
            alt="Rio Summer Club hero"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center bg-white px-6 py-20 text-black md:px-12">
          <div className="w-full max-w-xl">
            <motion.p
              {...reveal(0.08)}
              className="text-[10px] uppercase tracking-[0.45em] text-neutral-500"
            >
              {t('home.newDrop')}
            </motion.p>

            <motion.h1
              {...reveal(0.18)}
              className="mt-5 font-display text-[clamp(2.4rem,11vw,3.8rem)] uppercase leading-[0.86] tracking-[-0.03em] md:text-[clamp(2.8rem,6vw,5.8rem)]"
            >
              RIO SUMMER CLUB
              <br />
              NEW DROP
              <br />
              NOW AVAILABLE
            </motion.h1>

            <motion.p
              {...reveal(0.28)}
              className="mt-6 max-w-xs text-[11px] uppercase leading-6 tracking-[0.22em] text-neutral-600 md:max-w-sm md:text-[12px]"
            >
              New summer graphics, oversized cuts, and city energy.
            </motion.p>

            <motion.div
              {...reveal(0.4)}
              className="mt-8 flex flex-wrap gap-3 md:gap-4"
            >
              <Link
                to="/shop#rio-summer-club"
                className="rounded-full bg-black px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white! transition hover:text-white hover:opacity-90 md:px-7 md:text-[11px]"
              >
                {t('home.shopDrop')}
              </Link>

              <Link
                to="/shop"
                className="rounded-full border border-black bg-white px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-black transition hover:bg-black hover:text-white md:px-7 md:text-[11px]"
              >
                {t('home.viewAll')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-neutral-200 py-3">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {Array(8).fill(null).map((_, i) => (
            <span
              key={i}
              className="mx-10 text-[11px] uppercase tracking-[0.34em] text-neutral-500"
            >
              {t('home.marquee')}
            </span>
          ))}
        </motion.div>
      </section>

      {/* NEW DROP: RIO SUMMER CLUB */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              New Drop
            </p>

            <h2 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">
              RIO SUMMER CLUB
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {['rio-gold', 'cidade', 'rio-de-janeiro']
            .map((slug) => products.find((p) => p.slug === slug))
            .filter(Boolean)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      <BestSellers />

      {/* FULL COLLECTION: SS26 DROP */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              Full Collection
            </p>

            <h2 className="mt-4 font-display text-6xl uppercase md:text-8xl">
              SS26 DROP
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {products
            .filter((p) => p.collection === 'SS26 DROP 01')
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid overflow-hidden md:grid-cols-2">
          <div className="overflow-hidden">
            <motion.img
              src={editorial01}
              alt="ENGORIZ Editorial"
              loading="lazy"
              decoding="async"
              className="h-[62vh] w-full object-cover md:h-[78vh]"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="flex flex-col justify-end p-10 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
                {t('home.editorial')}
              </p>

              <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-none">
                BUILT
                <br />
                WITH
                <br />
                PRESSURE
              </h2>

              <p className="mt-6 max-w-sm text-[13px] leading-7 text-neutral-500">
                {t('home.editorialText')}
              </p>

              <Link
                to="/shop"
                className="mt-10 inline-block border-b border-black pb-1 text-[11px] uppercase tracking-[0.3em] transition hover:opacity-50"
              >
                {t('home.exploreStore')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}