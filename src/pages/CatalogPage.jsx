import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../api/api'
import ProductCard from '../components/products/ProductCard'
import Spinner from '../components/ui/Spinner'

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`

const Sidebar = styled.aside`
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Section = styled.div``

const Title = styled.h2`
  margin-bottom: .5rem;
  color: ${({ theme }) => theme.colors.text};
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  margin: .5rem 0;
  cursor: pointer;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
`

const SortButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: block;
  margin: .25rem 0;
  color: ${({ theme }) => theme.colors.text};
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
  gap: 1.5rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: .5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
`

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCat, setActiveCat] = useState('All Products')
  const [sort, setSort] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔍 Fetching products…')
    Promise.all([
      api.get('/products'),
      api.get('/categories')
    ]).then(([pRes, cRes]) => {
      console.log('✅ Products:', pRes.data.length, 'Categories:', cRes.data.length)
      setProducts(pRes.data)
      setFiltered(pRes.data)
      setCategories(['All Products', ...cRes.data.map(c=>c.name)])
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let list = [...products]
    // 1. filtro per categoria
    if (activeCat !== 'All Products') {
      list = list.filter(p => p.category === activeCat)
    }
    // 2. ricerca
    if (search) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }
    // 3. ordinamento
    if (sort === 'low') {
      list.sort((a,b) => a.price - b.price)
    } else if (sort === 'high') {
      list.sort((a,b) => b.price - a.price)
    } else if (sort === 'az') {
      list.sort((a,b) => a.name.localeCompare(b.name))
    } else if (sort === 'za') {
      list.sort((a,b) => b.name.localeCompare(a.name))
    }
    setFiltered(list)
  }, [activeCat, sort, search, products])

  if (loading) return <Spinner />

  return (
    <Container>
      <Sidebar>
        <Section>
          <Title>Categories</Title>
          <List>
            {categories.map(cat => (
              <ListItem
                key={cat}
                active={cat===activeCat}
                onClick={()=>{ setActiveCat(cat); setSort(null) }}
              >
                {cat}
              </ListItem>
            ))}
          </List>
        </Section>
        <Section>
          <Title>Sort By</Title>
          <SortButton onClick={()=>setSort(null)}>Popularity</SortButton>
          <SortButton onClick={()=>setSort('low')}>Price: Low to High</SortButton>
          <SortButton onClick={()=>setSort('high')}>Price: High to Low</SortButton>
          <SortButton onClick={()=>setSort('az')}>Name: A to Z</SortButton>
          <SortButton onClick={()=>setSort('za')}>Name: Z to A</SortButton>
        </Section>
        <Section>
          <button onClick={()=>{ setActiveCat('All Products'); setSort(null); setSearch('') }}>
            Reset Filters
          </button>
        </Section>
      </Sidebar>
      <main style={{ flex:1 }}>
        <Title>Catalog</Title>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />
        <div style={{ marginBottom: '1rem' }}>
          Showing {filtered.length} products
        </div>
        <Grid>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </main>
    </Container>
  )
}
