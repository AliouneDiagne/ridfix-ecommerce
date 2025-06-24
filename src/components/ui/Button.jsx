import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Per animazioni leggere [7]

/**
 * Componente Button riutilizzabile.
 * Supporta stati di hover e disabled, e animazioni leggere.
 */
const StyledButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)}; /* Spaziatura padding [8] */
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius}; /* Raggio dei bordi [9] */
  background: ${({ theme }) => theme.colors.primary}; /* Colore primario (arancione) [9] */
  color: ${({ theme }) => theme.colors.onPrimary}; /* Colore del testo sul primario [9] */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transizione fluida [7] */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || '#E65100'}; /* Scurendo il primario al hover */
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textLight}; /* Grigio chiaro quando disabilitato [9] */
    cursor: not-allowed;
    opacity: 0.7;
  }

  // Focus visibile per accessibilità [2, 7]
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Button = ({ children, ...props }) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.05 }} // Animazione leggera al passaggio del mouse [7]
      whileTap={{ scale: 0.95 }} // Animazione leggera al click
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;