// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

/* Stato iniziale ---------------------------------------------------------- */
const initialState = {
  items: [],           // [{ id, name, price, qty, … }]
};

/* Helper ------------------------------------------------------------------ */
const normalizePayload = (payload) => {
  // accetta sia { id, … } che { product, qty }
  if (payload && payload.product) {
    return { product: payload.product, qty: payload.qty ?? 1 };
  }
  return { product: payload,       qty: payload.qty ?? 1 };
};

/* Slice ------------------------------------------------------------------- */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /** Aggiunge un articolo (o incrementa la quantità) */
    addItem(state, action) {
      const { product, qty } = normalizePayload(action.payload);
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ ...product, qty });
      }
    },

    /** Rimuove un articolo dal carrello */
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    /** Svuota completamente il carrello */
    clearCart(state) {
      state.items = [];
    },
  },
});

/* Export ------------------------------------------------------------------ */
export const { addItem, removeItem, clearCart } = cartSlice.actions;
/** Alias per compatibilità con i componenti esistenti */
export const addToCart = addItem;

export default cartSlice.reducer;
