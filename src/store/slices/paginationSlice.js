import { createSlice } from '@reduxjs/toolkit';

/**
 * Stato iniziale:
 * - currentPage: numero di pagina attualmente visualizzata
 * - totalPages:  quante pagine esistono in totale (viene aggiornato dopo ogni fetch)
 * - pageSize:    quanti elementi mostri per pagina (utile per cambiare densità)
 */
const initialState = {
  currentPage: 1,
  totalPages: 1,
  pageSize: 12,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    /** Imposta la pagina corrente (1-based). */
    setPage(state, { payload }) {
      state.currentPage = payload;
    },
    /** Aggiorna il numero totale di pagine (es. dopo una nuova ricerca). */
    setTotalPages(state, { payload }) {
      state.totalPages = payload;
    },
    /** Facoltativo: cambia il numero di elementi per pagina. */
    setPageSize(state, { payload }) {
      state.pageSize = payload;
    },
    /** Riporta la paginazione allo stato iniziale (utile nei reset dei filtri). */
    resetPagination: () => initialState,
  },
});

export const {
  setPage,
  setTotalPages,
  setPageSize,
  resetPagination,
} = paginationSlice.actions;

export default paginationSlice.reducer;
