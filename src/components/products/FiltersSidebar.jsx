import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

/* ─────────────────────────────────────────────
 *  Styled components
 * ────────────────────────────────────────────*/
const SidebarContainer = styled.aside`
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 768px) {
    width: 100%;
    order: 2; /* mobile: sidebar sotto la search */
  }
`;

const FilterGroup = styled.div``;

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
  cursor: pointer;
`;

const Checkbox = styled.input``;

/* Input numerico per price range */
const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

/* Pulsante Reset */
const ResetButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

/* ─────────────────────────────────────────────
 *  Component
 * ────────────────────────────────────────────*/
export default function FiltersSidebar({ filters, onFilterChange, onResetFilters }) {
  // fallback a [] se lo slice non ha ancora popolato categories/brands
  const { categories = [], brands = [] } = useSelector((s) => s.products);

  return (
    <SidebarContainer>
      <h3>Filters</h3>

      {/* Category */}
      <FilterGroup>
        <FilterTitle>Category</FilterTitle>
        <Select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Brand */}
      <FilterGroup>
        <FilterTitle>Brand</FilterTitle>
        <Select
          value={filters.brand}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          aria-label="Filter by brand"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Price range */}
      <FilterGroup>
        <FilterTitle>Price Range</FilterTitle>
        <Input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice ?? ''}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
          aria-label="Minimum price"
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice ?? ''}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          aria-label="Maximum price"
        />
      </FilterGroup>

      {/* Availability */}
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

      {/* Reset */}
      {onResetFilters && (
        <ResetButton type="button" onClick={onResetFilters}>
          Reset Filters
        </ResetButton>
      )}
    </SidebarContainer>
  );
}

/* Prop types */
FiltersSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func, // facoltativa, usata se presente
};
