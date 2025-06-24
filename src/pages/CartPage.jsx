import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeFromCart, clearCart } from '../store/slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  padding: 2rem;
`
const Title = styled.h1`
  margin-bottom: 1rem;
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`
const Info = styled.div`
  flex: 1;
`
const Name = styled.div`
  font-weight: bold;
`
const Qty = styled.div`
  margin: 0.5rem 0;
`
const Price = styled.div`
  font-weight: bold;
`
const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`

export default function CartPage() {
  const { items, totalQty, totalPrice } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <Container>
        <Title>Your Cart is Empty</Title>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <List>
        {items.map(({ product, qty }) => (
          <Item key={product.id}>
            <Img src={product.image} alt={product.name} />
            <Info>
              <Name>{product.name}</Name>
              <Qty>Quantity: {qty}</Qty>
              <Price>€{(product.price * qty).toFixed(2)}</Price>
            </Info>
            <button onClick={() => dispatch(removeFromCart(product.id))}>
              Remove
            </button>
          </Item>
        ))}
      </List>
      <Actions>
        <div>
          <div>Total Items: {totalQty}</div>
          <div>Total Price: €{totalPrice.toFixed(2)}</div>
        </div>
        <button onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
        <button onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </Actions>
    </Container>
  )
}
