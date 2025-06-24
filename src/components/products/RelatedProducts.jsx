import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice'; // Per fetchare tutti i prodotti
import ProductCard from './ProductCard'; // Per mostrare i prodotti correlati
import Skeleton from '../ui/Skeleton';

/**
 * Componente RelatedProducts.
 * Suggerisce prodotti correlati allo stesso prodotto visualizzato (es. stessa categoria o brand). [58]
 */
const SectionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SectionTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

const RelatedProducts = ({ currentProductId, currentProductCategory }) => {
  const dispatch = useDispatch();
  const { items: allProducts, status } = useSelector(state => state.products); // Prendi tutti i prodotti dallo store Redux
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Se i prodotti non sono ancora stati caricati, dispatcha l'azione
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (allProducts.length > 0 && currentProductCategory) {
      // Filtra i prodotti per categoria e escludi il prodotto corrente [58]
      const filtered = allProducts.filter(
        p => p.category === currentProductCategory && p.id !== currentProductId
      );
      // Mescola i prodotti e prendi i primi 4 per esempio
      setRelatedProducts(
        filtered.sort(() => 0.5 - Math.random()).slice(0, 4)
      );
    }
  }, [allProducts, currentProductId, currentProductCategory]);

  if (status === 'loading') {
    return (
      <SectionContainer>
        <SectionTitle>Related Products</SectionTitle>
        <ProductsGrid>
          {[...Array(4)].map((_, i) => <Skeleton key={i} width="200px" height="280px" />)}
        </ProductsGrid>
      </SectionContainer>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null; // Non mostrare la sezione se non ci sono prodotti correlati
  }

  return (
    <SectionContainer>
      <SectionTitle>You might also like</SectionTitle>
      <ProductsGrid>
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default RelatedProducts;