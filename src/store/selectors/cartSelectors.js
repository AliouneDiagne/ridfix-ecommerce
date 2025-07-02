import { createSelector } from '@reduxjs/toolkit';

export const selectCartItemsCount = createSelector(
  state => state.cart.items,
  items => {
    if (!items) return 0;
    if (Array.isArray(items)) {
      return items.reduce((sum, item) => sum + (item.qty || item.quantity || 0), 0);
    }
    return Object.values(items).reduce((sum, item) => sum + (item.qty || item.quantity || 0), 0);
  }
);
