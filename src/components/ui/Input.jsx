// src/components/ui/Input.jsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';

/* ------------------------------------------------------------------ */
/*  Styled                                                            */
/* ------------------------------------------------------------------ */
const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const ControlWrapper = styled.div`
  position: relative;
`;

const IconSlot = styled.span`
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  pointer-events: none;   /* non intercetta il click */
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};
  padding-left: ${({ $hasIcon, theme }) =>
    $hasIcon ? `calc(${theme.spacing(1.5)} * 2.3)` : theme.spacing(1.5)};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.surfaceDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
const Input = forwardRef(
  (
    {
      label,
      icon,        // <FaUser />, <FaEnvelope />, ...
      type = 'text',
      name,
      error,
      as = 'input',  // supporta textarea
      ...props
    },
    ref
  ) => (
    <InputWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}

      <ControlWrapper>
        {icon && <IconSlot>{icon}</IconSlot>}

        <StyledInput
          as={as}
          type={type}
          name={name}
          id={name}
          ref={ref}
          $hasError={Boolean(error)}
          $hasIcon={Boolean(icon)}
          {...props}
        />
      </ControlWrapper>

      {error && (
        <ErrorMessage role="alert">{error}</ErrorMessage>
      )}
    </InputWrapper>
  )
);

export default Input;
