import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import formatPrice from '../../utils/formatPrice';

/**
 * Componente CartSummary.
 * Mostra un riepilogo del carrello con subtotale, tasse e spedizione (simulati), e totale.
 */
const SummaryContainer = styled.div`
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  min-width: 280px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TotalRow = styled(SummaryRow)`
  font-weight: bold;
  font-size: 1.3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(1.5)};
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const CartSummary = ({ subtotal }) => {
  const navigate = useNavigate();

  // Simulazione tasse e spedizione [58]
  const taxes = subtotal * 0.05; // 5% di tasse
  const shipping = subtotal > 50000 ? 0 : 799; // Spedizione gratis sopra 50€ (in cent)
  const total = subtotal + taxes + shipping;

  const handleCheckout = () => {
    navigate('/checkout'); // Naviga alla pagina di checkout [76]
  };

  return (
    <SummaryContainer>
      <SummaryRow>
        <span>Subtotal:</span>
        <span>{formatPrice(subtotal)}</span>
      </SummaryRow>
      <SummaryRow>
        <span>Shipping:</span>
        <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </SummaryRow>
      <SummaryRow>
        <span>Taxes (5%):</span>
        <span>{formatPrice(taxes)}</span>
      </SummaryRow>
      <TotalRow>
        <span>Total:</span>
        <span>{formatPrice(total)}</span>
      </TotalRow>
      <CheckoutButton onClick={handleCheckout} disabled={subtotal === 0}>
        Proceed to Checkout
      </CheckoutButton>
    </SummaryContainer>
  );
};

export default CartSummary;