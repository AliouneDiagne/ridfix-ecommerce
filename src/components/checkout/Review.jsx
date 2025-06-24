import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useCart } from '../../hooks/useCart'; // Hook per accedere ai dati del carrello [76]
import formatPrice from '../../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice'; // Azione per svuotare il carrello [76]

/**
 * Componente Review.
 * Mostra un riepilogo finale dell'ordine prima della conferma.
 */
const ReviewContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text};
`;

const TotalRow = styled(ItemRow)`
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: none;
  padding-top: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const Review = ({ onBack, onComplete }) => {
  const { items: cartItems, products, subtotal } = useCart(); // Accedi agli items del carrello e ai prodotti [76]
  const dispatch = useDispatch();

  // Calcola i dettagli degli articoli nel carrello per il riepilogo
  const details = Object.values(cartItems).map(({ productId, quantity }) => {
    const prod = products.find(p => p.id === productId);
    return {
      ...prod,
      quantity,
      itemTotal: prod.price * quantity,
    };
  });

  const handleCompleteOrder = () => {
    dispatch(clearCart()); // Svuota il carrello dopo l'ordine [76]
    onComplete(); // Passa alla pagina di successo
  };

  return (
    <ReviewContainer>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'inherit' }}>Order Review</h2>
      {details.map(item => (
        <ItemRow key={item.id}>
          <span>{item.title} x{item.quantity}</span>
          <span>{formatPrice(item.itemTotal)}</span>
        </ItemRow>
      ))}
      <TotalRow>
        <span>Total:</span>
        <span>{formatPrice(subtotal)}</span>
      </TotalRow>
      <ButtonGroup>
        <Button type="button" onClick={onBack}>Back</Button>
        <Button onClick={handleCompleteOrder}>Confirm Order</Button>
      </ButtonGroup>
    </ReviewContainer>
  );
};

export default Review;
