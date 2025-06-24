import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Componente Spinner per indicare stati di caricamento.
 * Implementa un'animazione di rotazione semplice.
 */
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.surfaceLight}; /* Grigio chiaro per il bordo esterno [9] */
  border-top: 4px solid ${({ theme }) => theme.colors.primary}; /* Colore primario per la parte animata [9] */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 0.8s linear infinite; /* Animazione di rotazione continua */
  margin: 20px auto; /* Centra lo spinner */
`;

const Spinner = () => {
  return <StyledSpinner aria-label="Loading content" />; // Aggiunto aria-label per accessibilità
};

export default Spinner;
