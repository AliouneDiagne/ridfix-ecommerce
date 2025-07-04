import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

// 📦 Fetch all orders (admin or user profile view)
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/orders');
      return res.data;
    } catch (err) {
      toast.error('Failed to fetch orders');
      return rejectWithValue(err.message);
    }
  }
);

// 🧾 Create a new order (checkout)
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const res = await api.post('/orders', order);
      toast.success('Order created successfully!');
      return res.data;
    } catch (err) {
      toast.error('Failed to create order');
      return rejectWithValue(err.message);
    }
  }
);

// ❌ Delete an order (admin)
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${orderId}`);
      toast.success('Order deleted');
      return orderId;
    } catch (err) {
      toast.error('Failed to delete order');
      return rejectWithValue(err.message);
    }
  }
);

// 🔧 Slice definition
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(order => order.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
