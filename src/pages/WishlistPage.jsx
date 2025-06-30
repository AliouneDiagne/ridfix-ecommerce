// src/pages/WishlistPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProducts } from '../store/slices/productsSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/products/ProductCard';

/* ──────────────  layout  ────────────── */
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
/* ────────────────────────────────────── */

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 1. L’array di ID salvato nello slice wishlist */
  const wishlistIds = useSelector((s) => s.wishlist.items);

  /* 2. Carica i prodotti se non presenti */
  const products = useSelector((s) => s.products.items);
  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  /* 3. Prodotti effettivamente in wishlist */
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
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
              <Btn onClick={() => dispatch(addToCart(p))}>Add to cart</Btn>
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
