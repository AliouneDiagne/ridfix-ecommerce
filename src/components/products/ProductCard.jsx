import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow .2s;
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
`

const ImgWrapper = styled.div`
  position: relative;
  padding-top: 75%;
  img {
    position: absolute;
    top:0;left:0;
    width:100%; height:100%;
    object-fit: cover;
  }
`

const Body = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  font-size: 1rem;
  margin: .5rem 0;
  color: ${({ theme }) => theme.colors.text};
`

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary};
`

const Stock = styled.span`
  background: ${props => props.countInStock>5 ? '#28a745' : '#ffc107'};
  color: #fff;
  font-size: .75rem;
  padding: .25rem .5rem;
  border-radius: 4px;
  margin-bottom: .5rem;
  align-self: start;
`

const AddBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: .5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: .5rem;
  &:hover { opacity: .9; }
`

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  return (
    <Card>
      <ImgWrapper>
        <img src={product.image} alt={product.name} />
      </ImgWrapper>
      <Body>
        <Stock countInStock={product.countInStock}>
          {product.countInStock>0 ? 'In Stock' : 'Out of Stock'}
        </Stock>
        <Title>{product.name}</Title>
        <div>
          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}
          <small> ({product.numReviews})</small>
        </div>
        <Price>€{product.price.toFixed(2)}</Price>
        <AddBtn onClick={() => dispatch(addToCart({ product, qty: 1 }))}>
          Add
        </AddBtn>
      </Body>
    </Card>
  )
}
