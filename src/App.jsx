import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Spinner from './components/ui/Spinner'

// Pagine lazy-loaded
const HomePage     = lazy(() => import('./pages/HomePage'))
const CatalogPage  = lazy(() => import('./pages/CatalogPage'))
const ProductPage  = lazy(() => import('./pages/ProductPage'))
const CartPage     = lazy(() => import('./pages/CartPage'))
const LoginPage    = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ProfilePage  = lazy(() => import('./pages/ProfilePage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const SuccessPage  = lazy(() => import('./pages/SuccessPage'))
const AdminPage    = lazy(() => import('./pages/AdminPage'))
const NotFound     = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
      />
    </>
  )
}
