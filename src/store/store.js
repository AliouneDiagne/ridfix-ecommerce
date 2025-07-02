// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, 
         FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* --- Importa i tuoi slice --- */
import authReducer      from './slices/authSlice';
import productsReducer  from './slices/productsSlice';
import cartReducer      from './slices/cartSlice';
import wishlistReducer  from './slices/wishlistSlice';
import ordersReducer    from './slices/ordersSlice';
import usersReducer     from './slices/usersSlice';

/* --- Root reducer --- */
const rootReducer = combineReducers({
  auth:      authReducer,
  products:  productsReducer,
  cart:      cartReducer,
  wishlist:  wishlistReducer,
  orders:    ordersReducer,
  users:     usersReducer,
});

/* --- Persist config (solo AUTH) --- */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Solo auth viene persistito da redux-persist!
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* --- Store configuration --- */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora i tipi di action di redux-persist che contengono funzioni
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
