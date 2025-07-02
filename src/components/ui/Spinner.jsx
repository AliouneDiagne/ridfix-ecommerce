// src/components/ui/Spinner.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Spinner: componente visuale per indicare loading.
 * Animazione smooth, centrata, accessibile (aria-label).
 */

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.surfaceLight};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 0.8s linear infinite;
  margin: 32px auto;
  display: block;
`;

const Spinner = () => (
  <StyledSpinner aria-label="Loading..." role="status" />
);

export default Spinner;
