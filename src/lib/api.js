const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

const fallbackApiUrl = isLocalHost ? 'http://localhost:4000' : 'https://engoriz.onrender.com'

export const API_URL =
  (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost'))
    ? import.meta.env.VITE_API_URL
    : fallbackApiUrl