import React from 'react';
import styled from 'styled-components';

/**
 * Componente Input riutilizzabile.
 * Gestisce l'aspetto visivo e un eventuale stato di errore.
 * Utilizza React.forwardRef per poter essere usato con librerie come React Hook Form.
 */
const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.danger : theme.colors.surfaceDark}; /* Rosso per errori [9] */
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.surfaceLight}; /* Sfondo più chiaro [9] */
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary}; /* Focus visibile [2, 7] */
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger}; /* Messaggio di errore in rosso [9] */
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const Input = React.forwardRef(({ label, type = 'text', name, error, ...props }, ref) => {
  return (
    <InputWrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledInput
        type={type}
        name={name}
        id={name}
        hasError={!!error} // Passa la prop hasError per styling condizionale
        ref={ref}
        {...props}
      />
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>} {/* Aggiunto role="alert" per accessibilità [14] */}
    </InputWrapper>
  );
});

export default Input;