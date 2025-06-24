import React from 'react';
import styled from 'styled-components';
import ProductCard from '../products/ProductCard'; // Per le singole schede prodotto
import Spinner from '../ui/Spinner'; // Per il caricamento
import Skeleton from '../ui/Skeleton'; // Per gli skeleton loader
import { useSelector } from 'react-redux';

/**
 * Componente FeaturedProducts.
 * Mostra una selezione di prodotti "in evidenza" dalla lista globale.
 */
const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  justify-items: center;
`;

const FeaturedProducts = () => {
  // Prendiamo i prodotti dallo store Redux
  const { items: products, status, error } = useSelector(state => state.products);

  // Filtriamo solo i primi 4 prodotti come "in evidenza" (o una logica più complessa se presente) [16]
  const featured = products.slice(0, 4); 

  if (status === 'loading') {
    return (
      <SectionContainer>
        <SectionTitle>Featured Products</SectionTitle>
        <ProductsGrid>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width="250px" height="350px" /> // Skeleton per i prodotti [7]
          ))}
        </ProductsGrid>
      </SectionContainer>
    );
  }

  if (status === 'failed') {
    return (
      <SectionContainer>
        <SectionTitle>Featured Products</SectionTitle>
        <p style={{ textAlign: 'center', color: 'red' }}>Error loading featured products: {error}</p>
      </SectionContainer>
    );
  }

  if (featured.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle>Featured Products</SectionTitle>
        <p style={{ textAlign: 'center', color: 'gray' }}>No featured products available at the moment.</p>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Featured Products</SectionTitle>
      <ProductsGrid>
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default FeaturedProducts;