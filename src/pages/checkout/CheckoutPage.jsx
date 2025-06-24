import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createOrder } from '../../store/slices/ordersSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: .5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const Select = styled.select`
  padding: .5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: .75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: .9; }
`;

export default function CheckoutPage() {
  const { items, totalPrice } = useSelector(state => state.cart);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const orderData = {
      orderItems: items.map(i => ({ productId: i.product.id, qty: i.qty })),
      shippingAddress,
      paymentMethod,
      totalPrice
    };
    dispatch(createOrder(orderData))
      .unwrap()
      .then(order => {
        dispatch(clearCart());
        navigate('/success', { state: { order } });
      });
  };

  return (
    <Container>
      <Title>Checkout</Title>
      <Form onSubmit={handleSubmit}>
        <label>
          Shipping Address
          <Input
            type="text"
            value={shippingAddress}
            onChange={e => setShippingAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Payment Method
          <Select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <option>Credit Card</option>
            <option>PayPal</option>
          </Select>
        </label>
        <div>Total: €{totalPrice.toFixed(2)}</div>
        <Button type="submit">Place Order</Button>
      </Form>
    </Container>
  );
}
