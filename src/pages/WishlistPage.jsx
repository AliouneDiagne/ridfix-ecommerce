// src/pages/WishlistPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProducts } from '../store/slices/productsSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/products/ProductCard';
import Spinner from '../components/ui/Spinner';    // se ne hai già uno

/* ---------- layout ---------- */
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
/* ---------------------------- */

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* wishlist ids */
  const wishlistIds = useSelector((s) => s.wishlist.items);

  /* products slice */
  const { items: products, status, error } = useSelector((s) => s.products);

  /* fetch only when idle */
  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  /* derive wishlist products */
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  /* loading state */
  if (status === 'loading') {
    return (
      <Container>
        <Title>Your Wishlist</Title>
        <Spinner />
      </Container>
    );
  }

  /* error state */
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

  /* empty wishlist */
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

  /* normal render */
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
