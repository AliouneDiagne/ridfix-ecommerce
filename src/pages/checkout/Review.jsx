import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import formatPrice from '../../utils/formatPrice';
import Button from '../../components/ui/Button';
import { clearCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

const List = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  margin-bottom: 1.5rem;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceDark};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Qty = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.98rem;
`;

const Price = styled.span`
  font-weight: 500;
  min-width: 90px;
  text-align: right;
`;

const Totals = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.13rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

const TotalRow = styled(Row)`
  font-weight: bold;
  font-size: 1.22rem;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  padding-top: 0.8rem;
  margin-top: 0.7rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export default function ReviewPage() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calcoli coerenti con la logica sconti
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      ((item.discountPrice && item.isDiscounted ? item.discountPrice : item.price) * item.qty),
    0
  );
  const taxes = subtotal * 0.05; // 5%
  const shipping = subtotal > 50 ? 0 : 7.99;
  const total = subtotal + taxes + shipping;

  const handleConfirm = () => {
    // Eventuale chiamata API per ordine (non inclusa qui, va inserita se presente)
    dispatch(clearCart());
    navigate('/checkout/success'); // Vai alla pagina successo
  };

  const handleBack = () => {
    navigate('/checkout'); // Torna alla pagina precedente del checkout
  };

  return (
    <Container>
      <Title>Order Review</Title>
      <List>
        {items.map(item => {
          const unitPrice = item.discountPrice && item.isDiscounted
            ? item.discountPrice
            : item.price;
          return (
            <ItemRow key={item.id}>
              <Info>
                <Img src={item.image || (item.images ? item.images[0] : '')} alt={item.name} />
                <div>
                  <Name>{item.name}</Name>
                  <div>
                    <Qty>Qty: {item.qty}</Qty>
                  </div>
                  {item.discountPrice && item.isDiscounted ? (
                    <div>
                      <span style={{ textDecoration: 'line-through', color: '#bbb', marginRight: 6 }}>
                        {formatPrice(item.price)}
                      </span>
                      <span style={{ color: '#e67e22', fontWeight: 600 }}>
                        {formatPrice(item.discountPrice)}
                      </span>
                    </div>
                  ) : (
                    <span>{formatPrice(item.price)}</span>
                  )}
                </div>
              </Info>
              <Price>{formatPrice(unitPrice * item.qty)}</Price>
            </ItemRow>
          );
        })}
      </List>
      <Totals>
        <Row>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </Row>
        <Row>
          <span>Taxes (5%)</span>
          <span>{formatPrice(taxes)}</span>
        </Row>
        <Row>
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </Row>
        <TotalRow>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </TotalRow>
      </Totals>
      <Actions>
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm Order
        </Button>
      </Actions>
    </Container>
  );
}

