/* ------------------------------------------------------------
 *  src/store/slices/productsSlice.js
 *  – gestione prodotti, brand e prodotto selezionato
 * -----------------------------------------------------------*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api   from '../../api/api';
import { toast } from 'react-toastify';

/* ─────────────────────────────────────────────
 *  1. Helper – costruisci query string da filtri
 *     • correzione filtro “solo disponibili”
 * ────────────────────────────────────────────*/
function buildProductsQueryParams(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append('category', filters.category);
  if (filters.brand)    params.append('brand', filters.brand);
  if (filters.minPrice) params.append('price_gte', filters.minPrice);
  if (filters.maxPrice) params.append('price_lte', filters.maxPrice);
  if (filters.search)   params.append('q', filters.search);

  /* ✅ usa _gte=1 per simulare “solo prodotti con stock ≥ 1” */
  if (filters.inStockOnly) params.append('inStock_gte', '1');

  if (filters.sortBy) {
    let order     = 'asc';
    let sortField = filters.sortBy;

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
 *     •  inStock ⇆ countInStock
 *     •  numReviews
 *     •  featured → isDiscounted
 * ────────────────────────────────────────────*/
function normalizeProduct(raw) {
  const p = { ...raw };

  /* 🔄 2.1 unifica nomenclatura stock */
  if (p.countInStock === undefined && p.inStock !== undefined) {
    p.countInStock = p.inStock;
  }
  if (p.inStock === undefined && p.countInStock !== undefined) {
    p.inStock = p.countInStock;
  }

  /* 🔢 2.2 calcola numero recensioni */
  p.numReviews = Array.isArray(p.reviews) ? p.reviews.length : 0;

  /* 💰 2.3 featured → isDiscounted + prezzo promo */
  if (p.featured === true && p.isDiscounted === undefined) {
    p.isDiscounted = true;
    if (p.discountPrice === undefined) {
      p.discountPrice = +(p.price * 0.9).toFixed(2); // –10 %
    }
  }

  return p;
}

/* ─────────────────────────────────────────────
 *  3. Async thunk: fetch lista prodotti
 * ────────────────────────────────────────────*/
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const params   = buildProductsQueryParams(filters);
      const { data } = await api.get(`/products?${params.toString()}`);

      return data.map(normalizeProduct);
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
  status:          'idle',
  error:           null,
  brandsStatus:    'idle',
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

    /* CRUD locale demo */
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
      .addCase(fetchProducts.pending,  (s) => { s.status = 'loading';   s.error = null;       })
      .addCase(fetchProducts.fulfilled,(s,{payload}) => { s.status='succeeded'; s.items=payload; })
      .addCase(fetchProducts.rejected, (s,{payload}) => { s.status='failed';    s.error=payload; s.items=[];});

    /* fetchProductById */
    builder
      .addCase(fetchProductById.pending,  (s) => { s.status='loading'; s.error=null; s.selectedProduct=null; })
      .addCase(fetchProductById.fulfilled,(s,{payload}) => { s.status='succeeded'; s.selectedProduct=payload; })
      .addCase(fetchProductById.rejected, (s,{payload}) => { s.status='failed';    s.error=payload; s.selectedProduct=null; });

    /* fetchBrands */
    builder
      .addCase(fetchBrands.pending,  (s) => { s.brandsStatus='loading'; s.brandsError=null; })
      .addCase(fetchBrands.fulfilled,(s,{payload}) => { s.brandsStatus='succeeded'; s.brands=payload; })
      .addCase(fetchBrands.rejected, (s,{payload}) => { s.brandsStatus='failed';    s.brandsError=payload; });
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

/* Facoltativo: helper per test */
export { buildProductsQueryParams };
