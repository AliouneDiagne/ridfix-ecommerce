import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import api from '../api/api';
import ProductCard from '../components/products/ProductCard';
import Spinner from '../components/ui/Spinner';

const Page = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const Sidebar = styled.aside`
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin: 0.25rem 0;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  text-align: left;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All Products']);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All Products');
  const [sort, setSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
        ]);
        setProducts(productRes.data);
        setCategories(['All Products', ...categoryRes.data.map(c => c.name)]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'All Products') {
      list = list.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    switch (sort) {
      case 'low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'az':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return list;
  }, [products, activeCategory, sort, searchQuery]);

  const resetFilters = useCallback(() => {
    setActiveCategory('All Products');
    setSort(null);
    setSearchQuery('');
  }, []);

  if (loading) return <Spinner />;

  return (
    <Page>
      {/* Sidebar */}
      <Sidebar>
        <section>
          <Heading>Categories</Heading>
          <List>
            {categories.map(cat => (
              <ListItem
                key={cat}
                $active={cat === activeCategory}
                onClick={() => {
                  setActiveCategory(cat);
                  setSort(null);
                }}
              >
                {cat}
              </ListItem>
            ))}
          </List>
        </section>

        <section>
          <Heading>Sort by</Heading>
          <TextButton onClick={() => setSort(null)}>Popularity</TextButton>
          <TextButton onClick={() => setSort('low')}>Price: Low → High</TextButton>
          <TextButton onClick={() => setSort('high')}>Price: High → Low</TextButton>
          <TextButton onClick={() => setSort('az')}>Name: A → Z</TextButton>
          <TextButton onClick={() => setSort('za')}>Name: Z → A</TextButton>
        </section>

        <section>
          <TextButton onClick={resetFilters} aria-label="Reset filters">
            Reset Filters
          </TextButton>
        </section>
      </Sidebar>

      {/* Main */}
      <Main>
        <Heading>Catalog</Heading>
        <label htmlFor="search" style={{ display: 'none' }}>
          Search products
        </label>
        <SearchInput
          id="search"
          type="text"
          placeholder="Search products…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div style={{ marginBottom: '1rem' }}>
          {filteredProducts.length} product
          {filteredProducts.length !== 1 && 's'} found
        </div>
        <Grid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Main>
    </Page>
  );
}
