import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

/* ---------- styled components ---------- */
const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow .2s;
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,.2); }
`;

const ImgWrapper = styled.div`
  position: relative;
  padding-top: 75%;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Body  = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: .5rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary};
`;

const StockBadge = styled.span`
  background: ${({ qty }) =>
    qty === 0      ? '#dc3545' :   // rosso
    qty <= 5       ? '#ffc107' :   // giallo
                     '#28a745'};   // verde
  color: #fff;
  font-size: .75rem;
  padding: .25rem .5rem;
  border-radius: 4px;
  margin-bottom: .5rem;
  align-self: flex-start;
`;

const AddBtn = styled.button.attrs(({ disabled }) => ({ disabled }))`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: .5rem;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? .6 : 1)};
  margin-top: .5rem;
  transition: opacity .2s;
`;

/* ---------- componente ---------- */
export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  /* countInStock arriva già dalla normalizzazione; faccio fallback a inStock */
  const qty = product.countInStock ?? product.inStock ?? 0;

  const stockLabel =
    qty === 0 ? 'Out of Stock'
    : qty <= 5 ? `Only ${qty} left`
    : 'In Stock';

  const stars = Math.round(product.rating || 0);
  const imageSrc = product.images?.[0] || product.image;

  return (
    <Card>
      <ImgWrapper>
        <img src={imageSrc} alt={product.name} />
      </ImgWrapper>

      <Body>
        <StockBadge qty={qty}>{stockLabel}</StockBadge>

        <Title>{product.name}</Title>

        <div>
          {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          <small> ({product.numReviews})</small>
        </div>

        <Price>€{product.price.toFixed(2)}</Price>

        <AddBtn
          disabled={qty === 0}
          onClick={() => qty && dispatch(addToCart({ product, qty: 1 }))}
        >
          Add
        </AddBtn>
      </Body>
    </Card>
  );
}
