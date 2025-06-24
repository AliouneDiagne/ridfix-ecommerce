import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../../store/slices/cartSlice'; // Azioni carrello
import Button from '../ui/Button';
import formatPrice from '../../utils/formatPrice';

/**
 * Componente CartItem.
 * Mostra un singolo articolo nel carrello, con dettagli, controllo quantità e pulsante di rimozione.
 */
const ItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surfaceLight}; /* Sfondo articolo [9] */
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-grow: 1;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemPrice = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.surfaceDark};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const RemoveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger}; /* Rosso per il tasto "Rimuovi" [9] */
  &:hover {
    background-color: #C62828; // Un rosso più scuro
  }
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity >= 1) {
      dispatch(changeQuantity({ productId: item.id, quantity: newQuantity })); // Azione per cambiare quantità [73]
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ productId: item.id })); // Azione per rimuovere [73]
  };

  return (
    <ItemContainer>
      <ItemDetails>
        <ItemImage src={item.image} alt={item.title} />
        <ItemInfo>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemPrice>{formatPrice(item.price)}</ItemPrice>
        </ItemInfo>
      </ItemDetails>
      <Controls>
        <QuantityInput
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          aria-label={`Change quantity for ${item.title}`}
        />
        <span>{formatPrice(item.price * item.quantity)}</span> {/* Subtotale per articolo */}
        <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
      </Controls>
    </ItemContainer>
  );
};

export default CartItem;