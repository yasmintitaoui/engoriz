import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

import lovePainHero from '../assets/campaign/love-pain-hero.webp'
import lovePainHeroMobile from '../assets/campaign/love-pain-hero-mobile.webp'
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
      <section className="relative min-h-[92svh] overflow-hidden bg-black text-white md:h-[100svh]">
        <picture className="absolute inset-0 block h-full w-full overflow-hidden">
          <source media="(min-width: 768px)" srcSet={lovePainHero} />
          <img
            src={lovePainHeroMobile}
            alt="Love Pain Campaign"
            loading="eager"
            decoding="async"
            className="absolute inset-0 block h-full w-full scale-[1.12] object-cover object-[center_30%]"
          />
        </picture>

        <div className="absolute inset-0 bg-black/10 md:bg-black/15" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-start justify-start px-6 pt-20 md:h-full md:items-start md:justify-end md:px-12 md:pt-36">
          <div className="max-w-[330px] text-left md:max-w-xl">
            <motion.p
              {...reveal(0.08)}
              className="text-[10px] uppercase tracking-[0.45em] text-white/70"
            >
              {t('home.newDrop')}
            </motion.p>

            <motion.h1
              {...reveal(0.18)}
              className="mt-5 font-display text-[clamp(2.4rem,11vw,3.8rem)] uppercase leading-[0.86] tracking-[-0.03em] md:text-[clamp(2.8rem,6vw,5.8rem)]"
            >
              LOVE PAIN
              <br />
              DROP — SS26
              <br />
              OUT NOW
            </motion.h1>

            <motion.p
              {...reveal(0.28)}
              className="mt-6 max-w-xs text-[11px] uppercase leading-6 tracking-[0.22em] text-white/75 md:max-w-sm md:text-[12px]"
            >
              A capsule born from pressure. Made by demand.
            </motion.p>

            <motion.div
              {...reveal(0.4)}
              className="mt-8 flex flex-wrap gap-3 md:gap-4"
            >
              <Link
                to="/shop#love-pain"
                className="rounded-full bg-white px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] !text-black transition hover:opacity-90 md:px-7 md:text-[11px]"
              >
                {t('home.shopDrop')}
              </Link>

              <Link
                to="/shop"
                className="rounded-full border border-white px-6 py-4 text-[10px] uppercase tracking-[0.25em] transition hover:bg-white hover:text-black md:px-7 md:text-[11px]"
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

      {/* NEW DROP: IDOLS & INK */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
              New Drop
            </p>

            <h2 className="mt-4 font-display text-6xl uppercase leading-none md:text-8xl">
              IDOLS &amp; INK
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {['ice-man', 'njr', 'lamarism', 'drake-the-punk']
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