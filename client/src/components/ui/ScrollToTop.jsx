import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1))
      let observer

      const scrollToTarget = () => {
        const element = document.getElementById(targetId)
        if (!element) return false

        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        observer?.disconnect()
        return true
      }

      if (!scrollToTarget()) {
        observer = new MutationObserver(scrollToTarget)
        observer.observe(document.body, { childList: true, subtree: true })
      }

      return () => observer?.disconnect()
    }

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, hash])

  return null
}