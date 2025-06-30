// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* ─────────────  slices  ───────────── */
import authReducer      from './slices/authSlice';
import productsReducer  from './slices/productsSlice';
import cartReducer      from './slices/cartSlice';
import wishlistReducer  from './slices/wishlistSlice';
import ordersReducer    from './slices/ordersSlice';
import usersReducer     from './slices/usersSlice';

/* ─────────────  root reducer  ─────── */
const rootReducer = combineReducers({
  auth:      authReducer,
  products:  productsReducer,
  cart:      cartReducer,
  wishlist:  wishlistReducer,
  orders:    ordersReducer,
  users:     usersReducer,
});

/* ─────────────  persist config  ───── */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'wishlist'],   // ⬅️ ciò che vuoi salvare
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ─────────────  store  ────────────── */
const store = configureStore({
  reducer: persistedReducer,
  // middleware default di RTK già include thunk + serializableCheck
  // serializableCheck ignora redux-persist di default, quindi OK
});

export const persistor = persistStore(store);
export default store;
