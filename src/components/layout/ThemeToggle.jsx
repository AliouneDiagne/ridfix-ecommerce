import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice'; // Azione per aggiungere al carrello
import { toggleWishlist } from '../../store/slices/wishlistSlice'; // Azione per la wishlist
import Button from '../ui/Button';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import formatPrice from '../../utils/formatPrice'; // Utilità per formattare il prezzo

/**
 * Componente ProductCard per mostrare un prodotto in una griglia.
 * Include immagine, nome, prezzo, brand, pulsante "Add to Cart" e "Wishlist".
 */
const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface}; /* Sfondo card [9] */
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
  cursor: pointer; // Indicatore di interattività [57]

  &:hover {
    transform: translateY(-5px); // Effetto leggero al passaggio del mouse [7]
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark}; /* Bordo immagine [9] */
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text};
`;

const ProductBrand = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight}; /* Testo più leggero [9] */
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary}; /* Prezzo in colore primario [9] */
  margin-top: auto; // Spinge in basso il prezzo
`;

const OldPrice = styled.span`
  text-decoration: line-through; /* Prezzo barrato per sconti [58] */
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledLink = styled(Link)`
  text-decoration: none; // Rimuovi sottolineatura predefinita del Link
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const WishlistButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, isWishlisted }) => 
    isWishlisted ? theme.colors.danger : theme.colors.textLight}; // Cuoricino rosso se in wishlist [58]
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: auto; // Allinea a destra
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary}; // Colore al hover [58]
  }
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  // Controlla se il prodotto è già nella wishlist [58]
  const isWishlisted = useSelector(state => !!state.wishlist.items[product.id]);

  // Calcola il prezzo scontato (simulato per esempio)
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const discountedPrice = hasDiscount 
    ? product.price * (1 - product.discountPercentage / 100) 
    : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita che il click si propaghi al Link e apra il dettaglio
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
    toast.success(`${product.title} added to cart!`); // Notifica toast [7]
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation(); // Evita la propagazione
    dispatch(toggleWishlist(product));
    toast.info(isWishlisted ? 
      `${product.title} removed from wishlist.` : 
      `${product.title} added to wishlist!`
    ); // Notifica wishlist [58]
  };

  return (
    <Card>
      <StyledLink to={`/product/${product.id}`}> {/* Link al dettaglio prodotto [59] */}
        <ProductImage src={product.image} alt={product.title} />
        <CardContent>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductBrand>{product.brandName}</ProductBrand> {/* Brand del prodotto */}
          {hasDiscount ? (
            <Price>
              {formatPrice(discountedPrice)}{' '}
              <OldPrice>{formatPrice(product.price)}</OldPrice>
            </Price>
          ) : (
            <Price>{formatPrice(product.price)}</Price>
          )}
        </CardContent>
      </StyledLink>
      <Actions>
        <Button onClick={handleAddToCart} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
        <WishlistButton onClick={handleToggleWishlist} isWishlisted={isWishlisted}>
          <FontAwesomeIcon icon={isWishlisted ? solidHeart : regularHeart} />
        </WishlistButton>
      </Actions>
    </Card>
  );
};

export default ProductCard;