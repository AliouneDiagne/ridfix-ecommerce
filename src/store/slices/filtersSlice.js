import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  brand: '',
  minPrice: 0,
  maxPrice: 500,
  inStockOnly: false,
  search: '',
  sortBy: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
