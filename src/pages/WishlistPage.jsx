// src/pages/WishlistPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProducts } from '../store/slices/productsSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { selectWishlistProducts } from '../store/slices/wishlistSlice';
import ProductCard from '../components/products/ProductCard';
import Spinner from '../components/ui/Spinner';

const Container = styled.div`
  padding: 2rem;
`;
const Title = styled.h1`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.3rem;
`;
const ActionBar = styled.div`
  margin-top: 0.6rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;
const Btn = styled.button`
  background: ${({ theme, $grey }) => ($grey ? '#777' : theme.colors.primary)};
  color: #fff;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    opacity: 0.9;
  }
`;
const Empty = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoized: products in wishlist (from Redux)
  const wishlistProducts = useSelector(selectWishlistProducts);
  const { status, error } = useSelector((s) => s.products);

  // 🚨 Forza sempre il fetch tranne quando è già in corso o completato!
  useEffect(() => {
    if (status !== 'succeeded' && status !== 'loading') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // DEBUG: log status e prodotti in wishlist
  console.log("Status:", status);
  console.log("Wishlist products:", wishlistProducts);

  if (status === 'loading' || status === 'idle') {
    return (
      <Container>
        <Title>Your Wishlist</Title>
        <Spinner />
      </Container>
    );
  }
  if (status === 'failed') {
    return (
      <Container>
        <Title>Your Wishlist</Title>
        <Empty>
          <p>Could not load products: {error}</p>
          <Btn onClick={() => dispatch(fetchProducts())}>Retry</Btn>
        </Empty>
      </Container>
    );
  }
  if (!wishlistProducts.length) {
    return (
      <Container>
        <Title>Your Wishlist</Title>
        <Empty>
          <p>Wishlist is empty.</p>
          <Btn onClick={() => navigate('/catalog')}>Browse products</Btn>
        </Empty>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Wishlist</Title>
      <Grid>
        {wishlistProducts.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
            <ActionBar>
              <Btn onClick={() => dispatch(addToCart({ product: p, qty: 1 }))}>
                Add to cart
              </Btn>
              <Btn $grey onClick={() => dispatch(removeFromWishlist(p.id))}>
                Remove
              </Btn>
            </ActionBar>
          </div>
        ))}
      </Grid>
    </Container>
  );
}
