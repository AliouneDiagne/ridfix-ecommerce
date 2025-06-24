import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

/**
 * Helper to build URLSearchParams for product fetching based on filters.
 * @param {Object} filters
 * @returns {URLSearchParams}
 */
function buildProductsQueryParams(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.brand) params.append('brand', filters.brand);
  if (filters.minPrice) params.append('price_gte', filters.minPrice);
  if (filters.maxPrice) params.append('price_lte', filters.maxPrice);
  if (filters.search) params.append('q', filters.search);
  if (filters.inStockOnly !== undefined)
    params.append('inStock', filters.inStockOnly ? 'true' : 'false');
  if (filters.sortBy) {
    let order = 'asc';
    let sortField = filters.sortBy;
    if (sortField.includes('_desc')) {
      sortField = sortField.replace('_desc', '');
      order = 'desc';
    } else if (sortField.includes('_asc')) {
      sortField = sortField.replace('_asc', '');
      order = 'asc';
    }
    params.append('_sort', sortField);
    params.append('_order', order);
  }
  return params;
}

// Async thunk for fetching all products with filters and sorting
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params = buildProductsQueryParams(filters);
      const response = await api.get(`/products?${params.toString()}`);
      // Success toast removed to avoid flooding on every filter/search
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to fetch products.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = `Failed to fetch product with ID ${id}.`;
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching brands (for filters)
export const fetchBrands = createAsyncThunk(
  'products/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (error) {
      let errorMessage = 'Failed to fetch brands.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the products slice
const initialState = {
  items: [],
  brands: [],
  selectedProduct: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  brandsStatus: 'idle', // Separate loading state for brands
  brandsError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    // Simulated CRUD actions (for local state only)
    addProduct: (state, action) => {
      state.items.push(action.payload);
      toast.success('Product added successfully!');
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        toast.success('Product updated successfully!');
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      toast.success('Product deleted successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.items = [];
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.selectedProduct = null;
      })
      // fetchBrands
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = 'loading';
        state.brandsError = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsStatus = 'failed';
        state.brandsError = action.payload;
        // Error toast already shown in thunk
      });
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

// Optionally export the helper for testing or reuse
export { buildProductsQueryParams };