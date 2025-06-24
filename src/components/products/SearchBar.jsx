import React from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import { useDebounce } from '../../hooks/useDebounce'; // Custom hook per il debounce

/**
 * Componente SearchBar.
 * Implementa una barra di ricerca con debounce per ottimizzare le performance.
 */
const SearchContainer = styled.div`
  flex: 1;
  min-width: 250px;
  position: relative; // Per i suggerimenti futuri [58]
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const SearchBar = ({ onSearch }) => {
  const debouncedSearch = useDebounce(onSearch, 500); // Debounce di 500ms [58]

  const handleChange = (e) => {
    debouncedSearch(e.target.value); // Invia il valore con debounce
  };

  return (
    <SearchContainer>
      <StyledInput
        type="text"
        placeholder="Search products..."
        onChange={handleChange}
        aria-label="Search products"
      />
      {/* Suggerimenti di ricerca verranno qui [58] */}
    </SearchContainer>
  );
};

export default SearchBar;