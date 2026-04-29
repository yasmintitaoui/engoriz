import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'

import lovePainHero from '../assets/campaign/love-pain-hero.png'
import lovePainHeroMobile from '../assets/campaign/love-pain-hero-mobile.png'
import editorial01 from '../assets/campaign/editorial-01.png'

import ProductGrid from '../components/product/ProductGrid'
import BestSellers from '../components/product/BestSellers'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
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
      <section className="relative h-[100svh] overflow-hidden bg-black text-white">
        <picture className="absolute inset-0">
          <source
            media="(max-width:768px)"
            srcSet={lovePainHeroMobile}
          />

          <img
            src={lovePainHero}
            alt="Love Pain campaign"
            className="h-full w-full object-cover object-center"
          />
        </picture>

        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-end px-6 md:px-12">
          <div className="max-w-xl text-left">
            <motion.p
              {...reveal(0.1)}
              className="text-[10px] uppercase tracking-[0.45em] text-white/65"
            >
              {t('home.newDrop')}
            </motion.p>

            <motion.h1
              {...reveal(0.2)}
              className="mt-5 font-display text-[clamp(3.1rem,7vw,6.2rem)] uppercase leading-[0.9] tracking-[-0.03em]"
            >
              {t('home.heroTitle').split('\n').map((line,i)=>(
                <span key={i}>
                  {line}
                  <br/>
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...reveal(0.35)}
              className="mt-7 max-w-sm text-[12px] uppercase leading-6 tracking-[0.22em] text-white/70"
            >
              {t('home.heroText')}
            </motion.p>

            <motion.div
              {...reveal(0.5)}
              className="mt-10 flex flex-wrap justify-start gap-4"
            >
              <Link
                to="/shop#love-pain"
                className="rounded-full bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] !text-black transition hover:opacity-90"
              >
                {t('home.shopDrop')}
              </Link>

              <Link
                to="/shop"
                className="rounded-full border border-white px-7 py-4 text-[11px] uppercase tracking-[0.28em] transition hover:bg-white hover:text-black"
              >
                {t('home.viewAll')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      <div className="overflow-hidden border-y border-neutral-200 bg-white py-3">
        <motion.div
          animate={{ x:['0%','-50%'] }}
          transition={{
            duration:24,
            ease:'linear',
            repeat:Infinity
          }}
          className="flex whitespace-nowrap"
        >
          {Array(8).fill(null).map((_,index)=>(
            <span
              key={index}
              className="mx-10 font-display text-[11px] uppercase tracking-[0.35em] text-neutral-500"
            >
              {t('home.marquee')}
            </span>
          ))}
        </motion.div>
      </div>


      <ProductGrid />

      <BestSellers />


      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid overflow-hidden md:grid-cols-2">

          <div className="overflow-hidden">
            <motion.img
              src={editorial01}
              alt="ENGORIZ editorial campaign"
              className="h-[62vh] w-full object-cover md:h-[78vh]"
              initial={{ scale:1.05 }}
              whileInView={{ scale:1 }}
              viewport={{ once:true }}
              transition={{
                duration:1.2,
                ease:[0.22,1,0.36,1]
              }}
            />
          </div>


          <div className="flex flex-col justify-end bg-white p-10 md:p-16">
            <motion.div
              initial={{ opacity:0,y:22 }}
              whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }}
              transition={{ duration:.8 }}
            >
              <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
                {t('home.editorial')}
              </p>

              <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-none">
                {t('home.builtWith').split('\n').map((line,i)=>(
                  <span key={i}>
                    {line}
                    <br/>
                  </span>
                ))}
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