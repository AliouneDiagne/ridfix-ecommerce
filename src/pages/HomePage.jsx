import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../api/api'
import ProductCard from '../components/products/ProductCard'
import Spinner from '../components/ui/Spinner'

// Contenitore completo
const Container = styled.div`
  padding: 2rem;
`

// Hero banner in cima
const Hero = styled.div`
  background: url('/images/hero-banner.jpg') center/cover no-repeat;
  height: 300px;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
`

// Sezione prodotti in evidenza
const Section = styled.section`
  margin-bottom: 2rem;
`

const Title = styled.h2`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
  gap: 1.5rem;
`

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Prendi tutti i prodotti e seleziona i primi 4 come "featured"
    api.get('/products')
      .then(res => {
        setFeatured(res.data.slice(0, 4))
      })
      .catch(() => {
        // se fallisce, lascia featured vuoto
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <Container>
      <Hero>Welcome to Ridfix Shop</Hero>

      <Section>
        <Title>Featured Products</Title>
        <Grid>
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Section>

      <Section>
        <Title>Shop by Category</Title>
        {/* Qui potresti aggiungere dei link o card per ciascuna categoria */}
        <p>Coming soon…</p>
      </Section>
    </Container>
  )
}
