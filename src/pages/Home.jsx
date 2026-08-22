import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

import newHero from '../assets/campaign/new-hero.webp'
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
            src={newHero}
            alt="Broken But Blessed hero"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center bg-white px-6 py-20 text-black md:px-12">
          <div className="w-full max-w-xl">
            <motion.p
              {...reveal(0.08)}
              className="text-[10px] uppercase tracking-[0.35em] text-neutral-500"
            >
              ENGORIZ / 2026
            </motion.p>

            <motion.h1
              {...reveal(0.18)}
              className="mt-5 font-display text-[clamp(2.8rem,10vw,6rem)] uppercase leading-[0.8] tracking-[-0.04em] md:text-[clamp(3.5rem,7vw,7.5rem)]"
            >
              BROKEN
              <br />
              BUT BLESSED
            </motion.h1>

            <motion.p
              {...reveal(0.28)}
              className="mt-6 max-w-xs text-[10px] uppercase leading-6 tracking-[0.28em] text-neutral-500 md:max-w-sm md:text-[11px]"
            >
              SOME THINGS BREAK.
              <br />
              SOME THINGS BECOME.
            </motion.p>

            <motion.div {...reveal(0.4)} className="mt-8">
              <Link
                to="/shop#broken-but-blessed"
                className="inline-flex items-center gap-2 border-b border-black pb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-black transition hover:opacity-60"
              >
                DISCOVER THE COLLECTION
                <span aria-hidden="true">→</span>
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

      {/* LIMITED DROP: BROKEN BUT BLESSED */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              New Drop
            </p>

            <h2 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">
              Limited Edition
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {products
            .filter((p) => p.collection === 'BROKEN BUT BLESSED')
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* ARCHIVE: RIO SUMMER CLUB */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              Archive
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
        <div className="relative overflow-hidden">
          <motion.img
            src={editorial01}
            alt="ENGORIZ Editorial"
            loading="lazy"
            decoding="async"
            className="h-[72vh] w-full object-cover md:h-[84vh]"
            initial={{ scale: 1.04 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">
              BROKEN BUT BLESSED / 2026
            </p>

            <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.04em] text-white">
              STILL HERE.
            </h2>

            <Link
              to="/shop#broken-but-blessed"
              className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white transition hover:opacity-75"
            >
              SHOP THE COLLECTION
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}