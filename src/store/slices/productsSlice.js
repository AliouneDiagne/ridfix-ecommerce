/* ------------------------------------------------------------
 *  src/store/slices/productsSlice.js
 *  – gestione prodotti, brand e prodotto selezionato
 * -----------------------------------------------------------*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

/* ─────────────────────────────────────────────
 *  1. Helper – costruisci query string da filtri
 * ────────────────────────────────────────────*/
function buildProductsQueryParams(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category)  params.append('category', filters.category);
  if (filters.brand)     params.append('brand', filters.brand);
  if (filters.minPrice)  params.append('price_gte', filters.minPrice);
  if (filters.maxPrice)  params.append('price_lte', filters.maxPrice);
  if (filters.search)    params.append('q', filters.search);
  if (filters.inStockOnly !== undefined)
    params.append('inStock', filters.inStockOnly ? 'true' : 'false');

  if (filters.sortBy) {
    let order      = 'asc';
    let sortField  = filters.sortBy;

    if (sortField.endsWith('_desc')) {
      sortField = sortField.replace('_desc', '');
      order = 'desc';
    } else if (sortField.endsWith('_asc')) {
      sortField = sortField.replace('_asc', '');
      order = 'asc';
    }
    params.append('_sort',  sortField);
    params.append('_order', order);
  }

  return params;
}

/* ─────────────────────────────────────────────
 *  2. Helper – normalizza formato prodotto
 *     • Converte `featured` → `isDiscounted`
 *     • Garantisce `discountPrice`
 * ────────────────────────────────────────────*/
function normalizeProduct(raw) {
  const p = { ...raw };

  // Se il vecchio schema usa "featured", traducilo
  if (p.featured === true && p.isDiscounted === undefined) {
    p.isDiscounted  = true;
    // Fallback discountPrice se manca
    if (p.discountPrice === undefined) {
      p.discountPrice = +(p.price * 0.9).toFixed(2); // 10 % sconto di default
    }
  }

  // 🔧 Puoi aggiungere qui altre normalizzazioni future
  return p;
}

/* ─────────────────────────────────────────────
 *  3. Async thunk: fetch lista prodotti
 * ────────────────────────────────────────────*/
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params    = buildProductsQueryParams(filters);
      const { data }  = await api.get(`/products?${params.toString()}`);

      return data.map(normalizeProduct); // ← normalizza qui
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Failed to fetch products.';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ─────────────────────────────────────────────
 *  4. Async thunk: fetch singolo prodotto
 * ────────────────────────────────────────────*/
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return normalizeProduct(data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        `Failed to fetch product with ID ${id}.`;
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ─────────────────────────────────────────────
 *  5. Async thunk: brand list (per i filtri)
 * ────────────────────────────────────────────*/
export const fetchBrands = createAsyncThunk(
  'products/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/brands');
      return data;
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Failed to fetch brands.';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ─────────────────────────────────────────────
 *  6. Stato iniziale
 * ────────────────────────────────────────────*/
const initialState = {
  items:           [],
  brands:          [],
  selectedProduct: null,
  status:          'idle',   // prodotti
  error:           null,
  brandsStatus:    'idle',   // brand
  brandsError:     null,
};

/* ─────────────────────────────────────────────
 *  7. Slice
 * ────────────────────────────────────────────*/
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

    /* CRUD locale (demo) */
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
    /* fetchProducts */
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error  = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.items  = payload;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error  = payload;
        state.items  = [];
      });

    /* fetchProductById */
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status          = 'loading';
        state.error           = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.status          = 'succeeded';
        state.selectedProduct = payload;
      })
      .addCase(fetchProductById.rejected, (state, { payload }) => {
        state.status          = 'failed';
        state.error           = payload;
        state.selectedProduct = null;
      });

    /* fetchBrands */
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = 'loading';
        state.brandsError  = null;
      })
      .addCase(fetchBrands.fulfilled, (state, { payload }) => {
        state.brandsStatus = 'succeeded';
        state.brands       = payload;
      })
      .addCase(fetchBrands.rejected, (state, { payload }) => {
        state.brandsStatus = 'failed';
        state.brandsError  = payload;
      });
  },
});

/* ─────────────────────────────────────────────
 *  8. Export
 * ────────────────────────────────────────────*/
export const {
  setSelectedProduct,
  clearSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;

/* Facoltativo: esporta helper per test */
export { buildProductsQueryParams };
