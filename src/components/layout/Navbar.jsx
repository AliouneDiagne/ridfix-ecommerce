import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faCog,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { selectCartItemsCount } from '../../store/selectors/cartSelectors';
import { selectWishlistCount } from '../../store/slices/wishlistSlice';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Brand = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing(1)} 0;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const WishlistLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WishlistBadge = styled.span`
  background-color: #FF4C00;
  color: #fff;
  border-radius: 50%;
  font-size: 0.78rem;
  min-width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -14px;
  font-weight: 700;
`;

const CartLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: 50%;
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  font-size: 0.75rem;
  min-width: 24px;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -14px;
`;

const AuthControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartItemsCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavContainer>
      <Brand to="/">Ridfix</Brand>
      <NavLinks>
        <li><NavItem to="/">Home</NavItem></li>
        <li><NavItem to="/catalog">Catalog</NavItem></li>
        <li><NavItem to="/about">About Us</NavItem></li>
        <li><NavItem to="/contact">Contact</NavItem></li>
        <li>
          <WishlistLink to="/wishlist">
            <FontAwesomeIcon icon={faHeart} />
            Wishlist
            {wishlistCount > 0 && (
              <WishlistBadge aria-label={`${wishlistCount} in wishlist`}>
                {wishlistCount}
              </WishlistBadge>
            )}
          </WishlistLink>
        </li>
      </NavLinks>
      <AuthControls>
        <ThemeToggle />
        <CartLink to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
        </CartLink>
        {user ? (
          <>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FontAwesomeIcon icon={faUser} /> {user.email}
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <FontAwesomeIcon icon={faCog} /> Admin
              </Link>
            )}
            <LogoutButton onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </LogoutButton>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        )}
      </AuthControls>
    </NavContainer>
  );
};

export default Navbar;
