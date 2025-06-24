import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const loadWishlistState = () => {
  try {
    const state = localStorage.getItem('wishlistState');
    return state ? JSON.parse(state) : { items: {} };
  } catch {
    return { items: {} };
  }
};

const saveWishlistState = (state) => {
  try {
    localStorage.setItem('wishlistState', JSON.stringify(state));
  } catch (err) {
    console.error('Wishlist save error:', err);
  }
};

const initialState = loadWishlistState();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const id = product.id;

      if (state.items[id]) {
        delete state.items[id];
        toast.info(`"${product.name}" removed from wishlist.`);
      } else {
        state.items[id] = product;
        toast.success(`"${product.name}" added to wishlist.`);
      }

      saveWishlistState(state);
    },
    clearWishlist: (state) => {
      state.items = {};
      saveWishlistState(state);
      toast.success('Wishlist cleared.');
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        delete state.items[id];
        toast.info('Item removed from wishlist.');
      }
      saveWishlistState(state);
    },
  },
});

export const { toggleWishlist, clearWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
