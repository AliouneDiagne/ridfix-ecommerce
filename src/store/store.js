import { configureStore } from '@reduxjs/toolkit';

// Importa tutti i reducer degli slices
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';

// Configura lo store Redux
const store = configureStore({
  reducer: {
    // Ogni chiave qui corrisponde a una parte dello stato globale
    auth: authReducer, // Stato di autenticazione
    products: productsReducer, // Stato dei prodotti
    cart: cartReducer, // Stato del carrello
    wishlist: wishlistReducer, // Stato della wishlist
    orders: ordersReducer, // Stato degli ordini (per admin)
    users: usersReducer, // Stato degli utenti (per admin, include anche currentUser di login)
  },
  // DevTools sono inclusi di default con Redux Toolkit
  // Middleware di Redux Thunk è incluso di default per gestire azioni asincrone
});

export default store; // Esporta lo store configurato