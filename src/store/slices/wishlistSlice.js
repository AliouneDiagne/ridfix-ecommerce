// src/store/slices/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/* ------------------------------------------------------------------ */
/*  Helpers: load / save da localStorage                              */
/* ------------------------------------------------------------------ */
const loadIds = () => {
  try {
    const raw = localStorage.getItem('wishlistIds');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveIds = (ids) => {
  try {
    localStorage.setItem('wishlistIds', JSON.stringify(ids));
  } catch (err) {
     
    console.error('Wishlist save error:', err);
  }
};

/* ------------------------------------------------------------------ */
/*  Initial state                                                     */
/* ------------------------------------------------------------------ */
const initialState = {
  ids: loadIds(), // array di numeri
};

/* ------------------------------------------------------------------ */
/*  Slice                                                             */
/* ------------------------------------------------------------------ */
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    /* Add / remove toggle -------------------------------------------- */
    toggleWishlist(state, action) {
      const payload = action.payload;
      const id = typeof payload === 'object' ? payload.id : payload;

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
        toast.info('Removed from wishlist.');
      } else {
        state.ids.push(id);
        toast.success('Added to wishlist.');
      }
      saveIds(state.ids);
    },

    /* Remove explicit ------------------------------------------------ */
    removeFromWishlist(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
        toast.info('Item removed from wishlist.');
        saveIds(state.ids);
      }
    },

    /* Clear all ------------------------------------------------------ */
    clearWishlist(state) {
      state.ids = [];
      saveIds(state.ids);
      toast.success('Wishlist cleared.');
    },
  },
});


export const selectWishlistIds = (state) => state.wishlist.ids;

export const {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
