import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api'; // Importa l'istanza Axios configurata
import { toast } from 'react-toastify'; // Per le notifiche

// Async Thunk per fetching degli ordini
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch orders.');
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk per aggiungere un nuovo ordine
export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders', newOrder);
      toast.success('Order added successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to add order.');
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk per aggiornare un ordine esistente
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (updatedOrder, { rejectWithValue }) => {
    try {
      const response = await api.put(`/orders/${updatedOrder.id}`, updatedOrder);
      toast.success('Order updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update order.');
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk per eliminare un ordine
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${orderId}`);
      toast.success('Order deleted successfully!');
      return orderId;
    } catch (error) {
      toast.error('Failed to delete order.');
      return rejectWithValue(error.message);
    }
  }
);

// Stato iniziale dello slice degli ordini
const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Creazione dello slice 'orders'
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestione di fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Gestione di addOrder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Gestione di updateOrder
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.items.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Gestione di deleteOrder
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(order => order.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
