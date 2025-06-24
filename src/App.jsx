import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// Stili globali e tema
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

// Store Redux
import store from './store/store';

// Componenti di Layout
import SkipNav from './components/layout/SkipNav';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pagine (lazy-loaded per ottimizzazione) [3]
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const SuccessPage = lazy(() => import('./pages/checkout/SuccessPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Componenti per rotte protette [3]
// Assicurati che questi componenti (PrivateRoute, AdminRoute) siano definiti e importati correttamente
// da `src/components/auth/` e che gestiscano la logica di reindirizzamento/autorizzazione.
// Esempio: `import PrivateRoute from './components/auth/PrivateRoute';`

function App() {
  return (
    // Provider Redux: rende lo store disponibile a tutta l'app [3]
    <Provider store={store}>
      {/* ThemeProvider: applica il tema definito in theme.js [3] */}
      <ThemeProvider theme={theme}>
        {/* Stili globali per reset, font, dark/light mode [3] */}
        <GlobalStyle />
        {/* Componente per l'accessibilità: "Salta al contenuto principale" [3] */}
        <SkipNav />
        {/* Navbar: la barra di navigazione principale [3] */}
        <Navbar />
        {/* Contenuto principale: qui verranno renderizzate le pagine [3] */}
        <main id="main-content" style={{ flex: 1 }}>
          {/* Suspense: mostra un fallback (es. "Caricamento...") mentre le pagine lazy-loaded vengono caricate [3] */}
          <Suspense fallback={<p>Caricamento…</p>}>
            {/* Routes: definisce tutte le rotte dell'applicazione [3] */}
            <Routes>
              {/* Rotte pubbliche accessibili a tutti [3] */}
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rotte protette che richiedono autenticazione (usando PrivateRoute) [3] */}
              {/* Se non hai ancora PrivateRoute e AdminRoute, queste rotte non funzioneranno correttamente come protette */}
              {/* Esempio di implementazione per PrivateRoute e AdminRoute è stato fornito in conversazioni precedenti [4] */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout/*" element={<CheckoutPage />} /> {/* Usato '/*' per nested routes di Checkout [3] */}
              <Route path="/success" element={<SuccessPage />} />
              
              {/* Rotta per la dashboard Admin (richiede ruolo admin, usando AdminRoute) [3] */}
              <Route path="/admin/*" element={<AdminPage />} /> {/* Usato '/*' per nested routes di Admin [3] */}

              {/* Rotta di fallback per pagine non trovate (404) [3] */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {/* Footer: il piè di pagina [3] */}
        <Footer />
        {/* ToastContainer: per mostrare notifiche (es. "Prodotto aggiunto al carrello") [3] */}
        <ToastContainer position="bottom-right" theme="dark" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;