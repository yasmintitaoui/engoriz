import { Link } from 'react-router-dom'
import { useTranslation } from '../../i18n/useTranslation'
import logoBlack from '../../assets/branding/logo-black.png'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-14 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <img src={logoBlack} alt="ENGORIZ" className="h-10 w-auto" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">
              Shop
            </p>

            <div className="mt-5 flex flex-col gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              <Link to="/shop#broken-but-blessed" className="hover:text-black transition">
                New Drop
              </Link>
              <Link to="/shop#rio-summer-club" className="hover:text-black transition">
                Archive
              </Link>
              <Link to="/shop" className="hover:text-black transition">
                Full Shop
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">
              Info
            </p>

            <div className="mt-5 flex flex-col gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              <Link to="/track-order" className="hover:text-black transition">
                Track Order
              </Link>
              <a href="mailto:contact@engoriz.com" className="hover:text-black transition">
                Contact
              </a>
              <p>Shipping</p>
              <p>Returns</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">
              Follow
            </p>

            <div className="mt-5 flex flex-col gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              <a href="https://instagram.com/engorizco" target="_blank" rel="noreferrer" className="hover:text-black transition">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-black transition">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6">
          <p className="text-center text-[10px] uppercase tracking-[0.28em] text-neutral-400">
            © {new Date().getFullYear()} ENGORIZ
          </p>
        </div>
      </div>
    </footer>
  )
}