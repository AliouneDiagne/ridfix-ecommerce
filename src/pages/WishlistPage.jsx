import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { fetchProducts } from '../store/slices/productsSlice';

const Container = styled.div`
  padding: 2rem;
`;
const Title = styled.h1`
  margin-bottom: 1rem;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;
const Item = styled.li`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;
const Button = styled.button`
  margin-top: auto;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: .5rem;
  cursor: pointer;
  &:hover { opacity: .9; }
`;

export default function WishlistPage() {
  const items = useSelector(state => state.wishlist.items || []);
  const products = useSelector(state => state.products.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const wishlistProducts = products.filter(p => items.includes(p.id));

  // Debug logs
  console.log('🛒 Wishlist items:', items);
  console.log('📦 Products:', products);
  console.log('🎯 Wishlist products:', wishlistProducts);

  if (wishlistProducts.length === 0) {
    return (
      <Container>
        <Title>Your Wishlist is Empty</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Wishlist</Title>
      <List>
        {wishlistProducts.map(p => (
          <Item key={p.id}>
            <h3>{p.name}</h3>
            <div>€{p.price.toFixed(2)}</div>
            <Button onClick={() => navigate(`/product/${p.id}`)}>
              View
            </Button>
            <Button onClick={() => dispatch(removeFromWishlist(p.id))}>
              Remove
            </Button>
          </Item>
        ))}
      </List>
    </Container>
  );
}
