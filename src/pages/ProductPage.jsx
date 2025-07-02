// src/pages/ProductPage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist, selectWishlistIds } from '../store/slices/wishlistSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import StockInfo from '../components/products/StockInfo';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  gap: 2rem;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.img`
  max-width: 320px;
  width: 100%;
  border-radius: 18px;
  object-fit: contain;
  background: #19191d;
`;

const Info = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 1rem 0 0.5rem 0;
`;

const Name = styled.h1`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.08rem;
  margin-bottom: 1.5rem;
`;

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 0.7rem 1.7rem;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HeartBtn = styled.button`
  background: none;
  border: none;
  margin-left: 8px;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.textLight)};
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.18s;
  vertical-align: middle;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Stock = styled.div`
  margin-bottom: 1rem;
`;

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Trova il prodotto nei prodotti già fetchati
  const product = useSelector((s) =>
    s.products.items.find((item) => String(item.id) === String(id))
  );
  const wishlistIds = useSelector(selectWishlistIds);
  const isInWishlist = wishlistIds.includes(String(id));

  if (!product) {
    return (
      <Wrapper>
        <div>
          <Name>Product Not Found</Name>
          <Desc>
            The product does not exist or is not available.
          </Desc>
          <Btn onClick={() => navigate('/catalog')}>Back to Catalog</Btn>
        </div>
      </Wrapper>
    );
  }

  // Event handler per carrello
  const handleAddToCart = () => {
    if (product.inStock > 0) {
      dispatch(addToCart({ product, qty: 1 }));
    } else {
      toast.error('Product is out of stock!');
    }
  };

  // Event handler per wishlist
  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const getDisplayPrice = () => {
    if (product.isDiscounted && product.discountPrice) {
      return (
        <>
          <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.05rem' }}>
            €{product.price.toFixed(2)}
          </span>{' '}
          <span>€{product.discountPrice.toFixed(2)}</span>
        </>
      );
    }
    return <>€{product.price.toFixed(2)}</>;
  };

  return (
    <Wrapper>
      <div>
        <Img
          src={product.images && product.images[0] ? `/images/${product.images[0]}` : '/images/placeholder.png'}
          alt={product.name}
        />
      </div>
      <Info>
        <Name>
          {product.name}
          <HeartBtn
            isActive={isInWishlist}
            onClick={handleToggleWishlist}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
          </HeartBtn>
        </Name>
        <Price>{getDisplayPrice()}</Price>
        <Stock>
          <StockInfo inStock={product.inStock}>
            {product.inStock > 0 ? `In Stock (${product.inStock})` : 'Out of Stock'}
          </StockInfo>
        </Stock>
        <Desc>{product.description}</Desc>
        <Btn
          onClick={handleAddToCart}
          disabled={product.inStock <= 0}
          aria-disabled={product.inStock <= 0}
        >
          Add to Cart
        </Btn>
      </Info>
    </Wrapper>
  );
}
