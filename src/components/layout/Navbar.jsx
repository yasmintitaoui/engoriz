import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore'
import { useLanguageStore } from '../../store/languageStore'
import { useTranslation } from '../../i18n/useTranslation'
import SearchOverlay from '../ui/SearchOverlay'
import logoBlack from '../../assets/branding/logo-black.png'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { toggleCart, getItemCount } = useCartStore()
  const { language, setLanguage } = useLanguageStore()
  const { t } = useTranslation()

  const count = getItemCount()

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
        <SearchOverlay
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        <div className="flex h-8 items-center justify-center bg-black px-4 text-center text-[10px] uppercase tracking-[0.28em] text-white">
          ENGORIZ SS26 DROP — CASH ON DELIVERY AVAILABLE
        </div>

        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-center px-5 md:h-24 md:px-10">

          <div className="absolute left-5 flex items-center gap-5 md:left-10">

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 transition hover:bg-neutral-100"
            >
              <Menu size={22} strokeWidth={1.5}/>
            </button>

            <Link
              to="/shop"
              className="hidden text-[11px] uppercase tracking-[0.28em] transition hover:opacity-50 md:block"
            >
              {t('nav.shop')}
            </Link>

          </div>


          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 transition hover:opacity-80"
          >
            <img
              src={logoBlack}
              alt="ENGORIZ"
              className="h-11 w-auto object-contain md:h-14"
            />
          </Link>


          <div className="absolute right-5 flex items-center gap-4 md:right-10 md:gap-6">

            <div className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] sm:flex">
              <button
                onClick={() => setLanguage('en')}
                className={`transition ${
                  language === 'en'
                    ? 'text-black'
                    : 'text-neutral-400'
                }`}
              >
                EN
              </button>

              <span className="text-neutral-300">/</span>

              <button
                onClick={() => setLanguage('fr')}
                className={`transition ${
                  language === 'fr'
                    ? 'text-black'
                    : 'text-neutral-400'
                }`}
              >
                FR
              </button>
            </div>


            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="rounded-full p-2 transition hover:bg-neutral-100"
            >
              <Search size={19} strokeWidth={1.55}/>
            </button>


            <Link
              to="/account"
              aria-label="Account"
              className="hidden rounded-full p-2 transition hover:bg-neutral-100 sm:block"
            >
              <User size={19} strokeWidth={1.55}/>
            </Link>


            <button
              onClick={toggleCart}
              aria-label="Open cart"
              className="relative rounded-full p-2 transition hover:bg-neutral-100"
            >
              <ShoppingBag size={19} strokeWidth={1.55}/>

              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white">
                  {count}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>



      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[9999]"
            initial={{ opacity:1 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
          >

            <button
              onClick={closeMenu}
              className="absolute inset-0 h-full w-full bg-black/35 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x:'-100%' }}
              animate={{ x:0 }}
              exit={{ x:'-100%' }}
              transition={{
                duration:.35,
                ease:[0.22,1,0.36,1]
              }}
              className="absolute left-0 top-0 z-[10000] flex h-screen w-[88vw] max-w-[420px] flex-col bg-white px-6 py-6 shadow-2xl md:px-8"
            >

              <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
                <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
                  {t('nav.menu')}
                </p>

                <button
                  onClick={closeMenu}
                  className="rounded-full p-2 transition hover:bg-neutral-100"
                >
                  <X size={22} strokeWidth={1.5}/>
                </button>
              </div>


              <nav className="flex flex-1 flex-col justify-center gap-6">

                <Link
                  to="/shop"
                  onClick={closeMenu}
                  className="font-display text-6xl uppercase leading-none transition hover:opacity-50"
                >
                  {t('nav.shop')}
                </Link>

                <Link
                  to="/shop#love-pain"
                  onClick={closeMenu}
                  className="text-sm uppercase tracking-[0.28em] text-neutral-500 hover:text-black"
                >
                  {t('nav.lovePainCapsule')}
                </Link>

                <Link
                  to="/shop#ss26-drop-01"
                  onClick={closeMenu}
                  className="text-sm uppercase tracking-[0.28em] text-neutral-500 hover:text-black"
                >
                  {t('nav.ss26Drop01')}
                </Link>

                <Link
                  to="/track-order"
                  onClick={closeMenu}
                  className="text-sm uppercase tracking-[0.28em] text-neutral-500 hover:text-black"
                >
                  {t('nav.trackOrder')}
                </Link>

                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="text-sm uppercase tracking-[0.28em] text-neutral-500 hover:text-black"
                >
                  {t('nav.account')}
                </Link>

              </nav>


              <div className="border-t border-neutral-200 pt-6">
                <p className="text-xs leading-6 text-neutral-400">
                  ENGORIZ SS26 — graphic oversized tees, limited drops, cash on
                  delivery across Morocco.
                </p>
              </div>

            </motion.aside>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}