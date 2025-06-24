import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; // Per prendere i brand

/**
 * Componente FiltersSidebar.
 * Fornisce opzioni di filtro per categoria, brand e disponibilità.
 */
const SidebarContainer = styled.aside`
  background: ${({ theme }) => theme.colors.surfaceLight}; /* Sfondo sidebar [9] */
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 280px; // Larghezza fissa per la sidebar
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 768px) { // Responsive: Sidebar in colonna su mobile
    width: 100%;
    order: 2; // Spostala sotto la ricerca su mobile
  }
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FilterTitle = styled.h5`
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  width: 100%;
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

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  cursor: pointer;
`;

const Checkbox = styled.input`
  /* Stili checkbox nativo o custom */
`;

const FiltersSidebar = ({ filters, onFilterChange, onResetFilters }) => {
  const { categories, brands } = useSelector(state => state.products); // Assumi che categories e brands siano nello slice products [70]

  return (
    <SidebarContainer>
      <h3>Filters</h3>

      <FilterGroup>
        <FilterTitle>Category</FilterTitle>
        <Select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option> // Assumi che le categorie abbiano id e nome
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Brand</FilterTitle>
        <Select
          value={filters.brand}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          aria-label="Filter by brand"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option> {/* Usa brand.id per il filtro numerico [18] */}
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Price Range</FilterTitle>
        {/* Implementare input range per il prezzo [70] */}
        <Input 
          type="number" 
          placeholder="Min Price" 
          value={filters.minPrice || ''}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
          aria-label="Minimum price"
        />
        <Input 
          type="number" 
          placeholder="Max Price" 
          value={filters.maxPrice || ''}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          aria-label="Maximum price"
        />
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Availability</FilterTitle>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
            aria-label="Only show in stock products"
          />
          Only In Stock
        </CheckboxContainer>
      </FilterGroup>

      {/* Pulsante per resettare i filtri [71] */}
      {/* <Button onClick={onResetFilters}>Reset Filters</Button> */} 
    </SidebarContainer>
  );
};

export default FiltersSidebar;