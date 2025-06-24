import React from 'react';
import styled from 'styled-components';

/**
 * Componente SkipNav per l'accessibilità.
 * Permette agli utenti di tastiera di saltare la navigazione e andare direttamente al contenuto principale.
 */
const StyledSkipNav = styled.a`
  position: absolute;
  top: -999px;
  left: -999px;
  background-color: ${({ theme }) => theme.colors.primary}; /* Colore primario [9] */
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${({ theme }) => theme.spacing(1)};
  z-index: 9999;
  text-decoration: none;

  &:focus {
    top: 0;
    left: 0;
    position: fixed; // Rende visibile quando in focus
    clip: auto;
  }
`;

const SkipNav = () => {
  return (
    <StyledSkipNav href="#main-content">
      Skip to main content
    </StyledSkipNav>
  );
};

export default SkipNav;