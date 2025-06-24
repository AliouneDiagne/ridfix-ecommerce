import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'; // Importa toast per le notifiche

// Funzione di utilità per caricare la wishlist dal localStorage
const loadWishlistState = () => {
  try {
    const serializedState = localStorage.getItem('wishlistState');
    if (serializedState === null) {
      return { items: {} }; // Stato iniziale vuoto
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading wishlist state from localStorage:", err);
    return { items: {} };
  }
};

// Funzione di utilità per salvare la wishlist nel localStorage
const saveWishlistState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('wishlistState', serializedState);
  } catch (err) {
    console.error("Error saving wishlist state to localStorage:", err);
  }
};

// Stato iniziale della wishlist
const initialState = loadWishlistState();

// Creazione dello slice 'wishlist'
const wishlistSlice = createSlice({
  name: 'wishlist', // Nome dello slice
  initialState, // Stato iniziale
  reducers: {
    // Azione per aggiungere/rimuovere un prodotto dalla wishlist
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const id = product.id;

      if (state.items[id]) {
        // Se il prodotto è già nella wishlist, lo rimuove
        delete state.items[id];
        toast.info(`"${product.name}" removed from wishlist.`); // Notifica
      } else {
        // Altrimenti, lo aggiunge
        state.items[id] = product;
        toast.success(`"${product.name}" added to wishlist!`); // Notifica
      }
      saveWishlistState(state); // Salva lo stato nel localStorage
    },
    // Azione per svuotare completamente la wishlist
    clearWishlist: (state) => {
      state.items = {};
      saveWishlistState(state);
      toast.success('Your wishlist has been cleared.');
    }
  },
});

// Esporta le azioni generate automaticamente
export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
// Esporta il reducer
export default wishlistSlice.reducer;
