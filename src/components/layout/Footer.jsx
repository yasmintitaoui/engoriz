import { Link } from 'react-router-dom'
import { useTranslation } from '../../i18n/useTranslation'
import logoBlack from '../../assets/branding/logo-black.png'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-14 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

        <div>
          <img
            src={logoBlack}
            alt="ENGORIZ"
            className="h-12 w-auto"
          />

          <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-500">
            {t('footer.text')}
          </p>

          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-neutral-400">
            {t('footer.slogan')}
          </p>
        </div>


        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            {t('footer.shop')}
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-500">

            <Link
              to="/shop#love-pain"
              className="hover:text-black transition"
            >
              Love Pain Capsule
            </Link>

            <Link
              to="/shop#ss26-drop-01"
              className="hover:text-black transition"
            >
              SS26 Drop 01
            </Link>

            <Link
              to="/shop"
              className="hover:text-black transition"
            >
              {t('footer.fullShop')}
            </Link>

          </div>
        </div>


        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            {t('footer.support')}
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-500">

            <Link
              to="/track-order"
              className="hover:text-black transition"
            >
              {t('nav.trackOrder')}
            </Link>

            <p>{t('checkout.cod')}</p>

            <p>Made by Demand</p>

            <p>Morocco Delivery</p>

          </div>
        </div>


        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            {t('footer.contact')}
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-neutral-500">

            <a
              href="https://instagram.com/engorizco"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition"
            >
              Instagram — @engorizco
            </a>

            <a
              href="mailto:contact@engoriz.com"
              className="hover:text-black transition"
            >
              contact@engoriz.com
            </a>

            <a
              href="mailto:orders@engoriz.com"
              className="hover:text-black transition"
            >
              orders@engoriz.com
            </a>

          </div>
        </div>

      </div>


      <div className="mx-auto mt-14 max-w-7xl border-t border-neutral-200 pt-6">
        <p className="text-center text-[11px] uppercase tracking-[0.24em] text-neutral-400">
          © {new Date().getFullYear()} ENGORIZ — {t('footer.rights')}
        </p>
      </div>

    </footer>
  )
}