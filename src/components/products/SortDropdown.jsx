import React from 'react';
import styled from 'styled-components';

/**
 * Componente SortDropdown.
 * Permette di ordinare la lista dei prodotti (prezzo, popolarità, novità).
 */
const DropdownContainer = styled.div`
  margin-left: auto; // Allinea a destra
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <DropdownContainer>
      <label htmlFor="sort-by-select" style={{ marginRight: '8px' }}>Sort By:</label>
      <Select
        id="sort-by-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort products by"
      >
        <option value="popularity">Popularity</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
        {/* Aggiungi altri criteri di ordinamento come "novità" se i dati lo supportano [70] */}
      </Select>
    </DropdownContainer>
  );
};

export default SortDropdown;