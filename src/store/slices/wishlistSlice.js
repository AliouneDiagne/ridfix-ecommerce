import { createSlice, createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Helpers: load / save da localStorage
const loadIds = () => {
  try {
    const raw = localStorage.getItem('wishlistIds');
    return raw ? JSON.parse(raw).map(String) : [];
  } catch {
    return [];
  }
};

const saveIds = (ids) => {
  try {
    localStorage.setItem('wishlistIds', JSON.stringify(ids.map(String)));
  } catch {
    // Ignored: fallback silent error, non blocca l'app
  }
};

const initialState = {
  ids: loadIds(), // array di stringhe
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const payload = action.payload;
      const id = typeof payload === 'object' ? String(payload.id) : String(payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
        toast.info('Removed from wishlist.');
      } else {
        state.ids.push(id);
        toast.success('Added to wishlist.');
      }
      saveIds(state.ids);
    },
    removeFromWishlist(state, action) {
      const id = String(action.payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
        toast.info('Item removed from wishlist.');
        saveIds(state.ids);
      }
    },
    clearWishlist(state) {
      state.ids = [];
      saveIds(state.ids);
      toast.success('Wishlist cleared.');
    },
  },
});

// Selector base: array di ID (stringhe)
export const selectWishlistIds = (state) => state.wishlist.ids;

// Selector memoizzato: prodotti wishlist dal catalogo
export const selectWishlistProducts = createSelector(
  [
    state => state.products.items,
    state => state.wishlist.ids
  ],
  (allProducts, wishlistIds) =>
    allProducts.filter(product => wishlistIds.includes(String(product.id)))
);

// Selector badge: quanti prodotti in wishlist
export const selectWishlistCount = createSelector(
  selectWishlistIds,
  (ids) => ids.length
);

export const {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
