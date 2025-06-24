import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'; // Importa toast per le notifiche

// Funzione di utilità per caricare il carrello dal localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { items: {}, totalAmount: 0, totalItems: 0 }; // Stato iniziale vuoto
    }
    // Ricalcola il totale per sicurezza, in caso di manipolazione esterna o dati vecchi
    const loadedState = JSON.parse(serializedState);
    const totalAmount = Object.values(loadedState.items).reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = Object.values(loadedState.items).reduce((acc, item) => acc + item.quantity, 0);
    return { ...loadedState, totalAmount, totalItems };
  } catch (err) {
    console.error("Error loading cart state from localStorage:", err);
    return { items: {}, totalAmount: 0, totalItems: 0 };
  }
};

// Funzione di utilità per salvare il carrello nel localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error("Error saving cart state to localStorage:", err);
  }
};

// Stato iniziale del carrello
const initialState = loadCartState();

// Helper per calcolare il totale del carrello e il numero di articoli
const calculateTotals = (items) => {
  let totalAmount = 0;
  let totalItems = 0;
  for (const id in items) {
    const item = items[id];
    totalAmount += item.price * item.quantity;
    totalItems += item.quantity;
  }
  return { totalAmount, totalItems };
};

// Creazione dello slice 'cart'
const cartSlice = createSlice({
  name: 'cart', // Nome dello slice
  initialState, // Stato iniziale
  reducers: {
    // Aggiunge un prodotto al carrello o ne incrementa la quantità
    addToCart: (state, action) => {
      const product = action.payload;
      const id = product.id;

      if (state.items[id]) {
        // Se il prodotto è già nel carrello, incrementa la quantità
        state.items[id].quantity++;
        toast.info(`Increased quantity for "${product.name}"`); // Notifica
      } else {
        // Altrimenti, aggiunge il prodotto con quantità 1
        state.items[id] = { ...product, quantity: 1 };
        toast.success(`"${product.name}" added to cart!`); // Notifica
      }
      // Ricalcola i totali
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
      saveCartState(state); // Salva lo stato nel localStorage
    },
    // Rimuove un prodotto dal carrello
    removeFromCart: (state, action) => {
      const id = action.payload;
      const productName = state.items[id] ? state.items[id].name : 'Item';
      delete state.items[id]; // Rimuove l'elemento
      // Ricalcola i totali
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
      saveCartState(state); // Salva lo stato nel localStorage
      toast.error(`"${productName}" removed from cart.`); // Notifica
    },
    // Aggiorna la quantità di un prodotto specifico
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity = quantity; // Imposta la nuova quantità
        if (state.items[id].quantity <= 0) {
          delete state.items[id]; // Rimuove se la quantità è 0 o meno
          toast.info(`Quantity of "${state.items[id].name}" updated.`);
        }
      }
      // Ricalcola i totali
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
      saveCartState(state); // Salva lo stato nel localStorage
    },
    // Svuota completamente il carrello
    clearCart: (state) => {
      state.items = {}; // Resetta gli articoli
      state.totalAmount = 0; // Resetta il totale
      state.totalItems = 0; // Resetta il conteggio degli articoli
      saveCartState(state); // Salva lo stato nel localStorage
      toast.success('Your cart has been cleared!'); // Notifica
    },
  },
});

// Esporta le azioni generate automaticamente
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// Esporta il reducer
export default cartSlice.reducer;