const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

const localApiUrl = 'http://localhost:4000'
const renderApiUrl = 'https://engoriz.onrender.com'

export const API_URL =
  isLocalHost
    ? localApiUrl
    : (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost'))
      ? import.meta.env.VITE_API_URL
      : renderApiUrl