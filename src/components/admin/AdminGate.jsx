import { useEffect, useState } from 'react'

const ADMIN_PASSWORD = 'engorizadmin'
const SESSION_KEY = 'engoriz-admin-session'
const SESSION_MINUTES = 30

function isSessionValid() {
  const saved = sessionStorage.getItem(SESSION_KEY)
  if (!saved) return false

  try {
    const session = JSON.parse(saved)
    return Date.now() < session.expiresAt
  } catch {
    return false
  }
}

export default function AdminGate({ children }) {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(isSessionValid)
  const [error, setError] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        sessionStorage.removeItem(SESSION_KEY)
        setUnlocked(false)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== ADMIN_PASSWORD) {
      setError('Wrong password.')
      return
    }

    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        unlockedAt: Date.now(),
        expiresAt: Date.now() + SESSION_MINUTES * 60 * 1000,
      })
    )

    setUnlocked(true)
    setError('')
    setPassword('')
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setUnlocked(false)
  }

  if (unlocked) {
    return (
      <>
        <div className="fixed bottom-5 right-5 z-[9999]">
          <button
            onClick={logout}
            className="rounded-full bg-black px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] !text-white shadow-xl"
          >
            Admin Logout
          </button>
        </div>

        {children}
      </>
    )
  }

  return (
    <main className="min-h-screen bg-white px-5 py-20 md:px-10">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] md:p-8">
        <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">
          ENGORIZ Admin
        </p>

        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
          Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Admin access expires after 30 minutes or when this browser session
          closes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-xl border border-neutral-300 px-4 text-sm outline-none focus:border-black"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="h-14 w-full rounded-xl bg-black text-sm font-semibold uppercase tracking-[0.22em] !text-white">
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}