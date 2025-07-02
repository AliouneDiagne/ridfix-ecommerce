// src/store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

// 1. Helper per query string
function buildProductsQueryParams(filters = {}) {
  const params = new URLSearchParams();

  if (filters?.category) params.append('category', filters.category);
  if (filters?.brand) params.append('brand', filters.brand);
  if (filters?.minPrice) params.append('price_gte', filters.minPrice);
  if (filters?.maxPrice) params.append('price_lte', filters.maxPrice);
  if (filters?.search) params.append('q', filters.search);

  if (filters?.inStockOnly) params.append('inStock_gte', '1');

  if (filters?.sortBy) {
    let order = 'asc';
    let sortField = filters.sortBy;
    if (sortField.endsWith('_desc')) {
      sortField = sortField.replace('_desc', '');
      order = 'desc';
    } else if (sortField.endsWith('_asc')) {
      sortField = sortField.replace('_asc', '');
      order = 'asc';
    }
    params.append('_sort', sortField);
    params.append('_order', order);
  }

  return params;
}

// 2. Normalizzazione prodotto
function normalizeProduct(raw) {
  const p = { ...raw };
  if (p.countInStock === undefined && p.inStock !== undefined) {
    p.countInStock = p.inStock;
  }
  if (p.inStock === undefined && p.countInStock !== undefined) {
    p.inStock = p.countInStock;
  }
  p.numReviews = Array.isArray(p.reviews) ? p.reviews.length : 0;
  if (p.featured === true && p.isDiscounted === undefined) {
    p.isDiscounted = true;
    if (p.discountPrice === undefined) {
      p.discountPrice = +(p.price * 0.9).toFixed(2);
    }
  }
  return p;
}

// 3. Async thunk: fetch lista prodotti
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params = buildProductsQueryParams(filters);
      const { data } = await api.get(`/products?${params.toString()}`);
      return data.map(normalizeProduct);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch products.';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return normalizeProduct(data);
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to fetch product with ID ${id}.`;
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  'products/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/brands');
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch brands.';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  items: [],
  brands: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  brandsStatus: 'idle',
  brandsError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct(state, { payload }) {
      state.selectedProduct = payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    addProduct(state, { payload }) {
      state.items.push(normalizeProduct(payload));
      toast.success('Product added successfully!');
    },
    updateProduct(state, { payload }) {
      const idx = state.items.findIndex((p) => p.id === payload.id);
      if (idx !== -1) {
        state.items[idx] = normalizeProduct(payload);
        toast.success('Product updated successfully!');
      }
    },
    deleteProduct(state, { payload: id }) {
      state.items = state.items.filter((p) => p.id !== id);
      toast.success('Product deleted successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = 'loading';   s.error = null;       })
      .addCase(fetchProducts.fulfilled, (s, { payload }) => { s.status = 'succeeded'; s.items = payload; })
      .addCase(fetchProducts.rejected, (s, { payload }) => { s.status = 'failed';    s.error = payload; s.items = []; });

    builder
      .addCase(fetchProductById.pending, (s) => { s.status = 'loading'; s.error = null; s.selectedProduct = null; })
      .addCase(fetchProductById.fulfilled, (s, { payload }) => { s.status = 'succeeded'; s.selectedProduct = payload; })
      .addCase(fetchProductById.rejected, (s, { payload }) => { s.status = 'failed'; s.error = payload; s.selectedProduct = null; });

    builder
      .addCase(fetchBrands.pending, (s) => { s.brandsStatus = 'loading'; s.brandsError = null; })
      .addCase(fetchBrands.fulfilled, (s, { payload }) => { s.brandsStatus = 'succeeded'; s.brands = payload; })
      .addCase(fetchBrands.rejected, (s, { payload }) => { s.brandsStatus = 'failed'; s.brandsError = payload; });
  },
});

export const {
  setSelectedProduct,
  clearSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;

export { buildProductsQueryParams };
