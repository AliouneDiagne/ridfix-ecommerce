// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import store from './store/store';

import SkipNav from './components/layout/SkipNav';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/auth/PrivateRoute';

// Lazy load pages (tutti i path DEVONO esistere ed esportare default)
const HomePage      = lazy(() => import('./pages/HomePage'));
const CatalogPage   = lazy(() => import('./pages/CatalogPage'));
const ProductPage   = lazy(() => import('./pages/ProductPage'));
const CartPage      = lazy(() => import('./pages/CartPage'));
const WishlistPage  = lazy(() => import('./pages/WishlistPage'));
const LoginPage     = lazy(() => import('./pages/LoginPage'));
const RegisterPage  = lazy(() => import('./pages/RegisterPage'));
const ProfilePage   = lazy(() => import('./pages/ProfilePage'));
const CheckoutPage  = lazy(() => import('./pages/checkout/CheckoutPage'));
const ReviewPage    = lazy(() => import('./pages/checkout/Review'));      // Deve esportare default ReviewPage
const SuccessPage   = lazy(() => import('./pages/checkout/SuccessPage'));
const AdminPage     = lazy(() => import('./pages/AdminPage'));
const AboutPage     = lazy(() => import('./pages/AboutPage'));
const ContactPage   = lazy(() => import('./pages/ContactPage'));
const NotFoundPage  = lazy(() => import('./pages/NotFoundPage'));
const PolicyPage    = lazy(() => import('./pages/Policy'));

// **Fallback di caricamento universale**
function LoadingFallback() {
  return (
    <div style={{
      minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <span style={{ fontSize: 18 }}>Caricamento…</span>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SkipNav />
        <Navbar />
        <main id="main-content" style={{ flex: 1 }}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Rotte protette */}
              <Route
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <WishlistPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout/review"
                element={
                  <PrivateRoute>
                    <ReviewPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout/success"
                element={
                  <PrivateRoute>
                    <SuccessPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />

              {/* Pubbliche */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/policy" element={<PolicyPage />} />

              {/* 404 fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
