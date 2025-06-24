import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Componente Skeleton per indicare il caricamento di contenuti.
 * Simula la forma e la dimensione del contenuto che verrà caricato.
 */
const pulse = keyframes`
  0% {
    background-color: ${({ theme }) => theme.colors.surfaceDark}; /* Colore scuro iniziale [9] */
  }
  50% {
    background-color: ${({ theme }) => theme.colors.surfaceLight}; /* Colore più chiaro a metà animazione [9] */
  }
  100% {
    background-color: ${({ theme }) => theme.colors.surfaceDark};
  }
`;

const StyledSkeleton = styled.div`
  width: ${({ width }) => width || '100%'}; /* Larghezza dinamica o di default */
  height: ${({ height }) => height || '1em'}; /* Altezza dinamica o di default */
  border-radius: ${({ theme }) => theme.borderRadius};
  animation: ${pulse} 1.5s infinite ease-in-out; /* Animazione di pulsazione */
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Skeleton = ({ width, height }) => {
  return <StyledSkeleton width={width} height={height} aria-hidden="true" />; // aria-hidden per non essere letto dagli screen reader
};

export default Skeleton;