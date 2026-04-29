import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SideCart from './components/cart/SideCart'

import LoadingScreen from './components/ui/LoadingScreen'
import PageTransition from './components/ui/PageTransition'
import ScrollToTop from './components/ui/ScrollToTop'

import AdminGate from './components/admin/AdminGate'

import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import Account from './pages/Account'
import TrackOrder from './pages/TrackOrder'
import AdminOrders from './components/admin/AdminOrders'
import NotFound from './pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Category /></PageTransition>} />
        <Route path="/product/:slug" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/thank-you" element={<PageTransition><ThankYou /></PageTransition>} />
        <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
        <Route path="/track-order" element={<PageTransition><TrackOrder /></PageTransition>} />

        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminGate>
                <AdminOrders />
              </AdminGate>
            </PageTransition>
          }
        />

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollToTop />
      <Navbar />
      <SideCart />
      <AnimatedRoutes />
      <Footer />
    </>
  )
}