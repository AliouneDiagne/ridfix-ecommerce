import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Stato iniziale e persistenza robusta
const loadCartState = () => {
  try {
    const saved = localStorage.getItem('cartState');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Protezione: items DEVE essere array
      if (!parsed.items || !Array.isArray(parsed.items)) {
        parsed.items = [];
      }
      if (typeof parsed.totalAmount !== 'number') parsed.totalAmount = 0;
      if (typeof parsed.totalItems !== 'number') parsed.totalItems = 0;
      return parsed;
    }
  } catch {
    // Silenzioso
  }
  // Stato fallback
  return { items: [], totalAmount: 0, totalItems: 0 };
};

const saveCartState = (state) => {
  try {
    localStorage.setItem(
      'cartState',
      JSON.stringify({
        items: state.items,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
      })
    );
  } catch {
    // Silenzioso
  }
};

const calculateTotals = (items) => {
  let totalAmount = 0;
  let totalItems = 0;
  for (const item of items) {
    const unitPrice = item.discountPrice && item.isDiscounted
      ? item.discountPrice
      : item.price;
    totalAmount += unitPrice * item.qty;
    totalItems += item.qty;
  }
  return { totalAmount, totalItems };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    addItem(state, action) {
      // --- Protezione: items deve essere array sempre
      if (!Array.isArray(state.items)) state.items = [];
      const { product, qty = 1 } = action.payload.product
        ? { product: action.payload.product, qty: action.payload.qty ?? 1 }
        : { product: action.payload, qty: action.payload.qty ?? 1 };

      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.qty += qty;
        toast.info(`Quantity of "${product.name}" updated.`);
      } else {
        state.items.push({ ...product, qty });
        toast.success(`"${product.name}" added to cart!`);
      }

      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
      saveCartState(state);
    },

    removeItem(state, action) {
      if (!Array.isArray(state.items)) state.items = [];
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (!existing) return;

      const productName = existing.name || 'Item';
      state.items = state.items.filter((item) => item.id !== id);

      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
      saveCartState(state);

      toast.error(`"${productName}" removed from cart.`);
    },

    updateQuantity(state, action) {
      if (!Array.isArray(state.items)) state.items = [];
      const { id, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (!existing) return;

      if (quantity > 0) {
        existing.qty = quantity;
        toast.info(`Quantity of "${existing.name}" updated.`);
      } else {
        const removedName = existing.name || 'Item';
        state.items = state.items.filter((item) => item.id !== id);
        toast.error(`"${removedName}" removed from cart.`);
      }

      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalItems = totals.totalItems;
      saveCartState(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      saveCartState(state);
      toast.info('Cart cleared!');
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const addToCart = addItem;
export const removeFromCart = removeItem;
export default cartSlice.reducer;
