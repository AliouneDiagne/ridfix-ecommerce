// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
         FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Importa i tuoi slice Redux
import authReducer      from './slices/authSlice';
import productsReducer  from './slices/productsSlice';
import cartReducer      from './slices/cartSlice';
import wishlistReducer  from './slices/wishlistSlice';
import ordersReducer    from './slices/ordersSlice';
import usersReducer     from './slices/usersSlice';

// Definisci il root reducer combinando tutti gli slice
const rootReducer = combineReducers({
  auth:      authReducer,
  products:  productsReducer,
  cart:      cartReducer,
  wishlist:  wishlistReducer,
  orders:    ordersReducer,
  users:     usersReducer,
});

// Configurazione redux-persist: solo 'auth' viene persistito
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// Applica il reducer persistito
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crea lo store con i middleware corretti (serializableCheck fix per redux-persist)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora i tipi di azione di redux-persist che non sono serializzabili
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
