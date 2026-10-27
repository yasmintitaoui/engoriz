import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Recover from stale Vite chunks after a new deployment.
// A customer's browser can sometimes have an old index.html
// pointing to JavaScript files from a previous deployment.
let hasReloaded = false

window.addEventListener('vite:preloadError', (event) => {
  if (hasReloaded) return

  hasReloaded = true

  event.preventDefault()

  window.location.reload()
})

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found. The app cannot mount.')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)