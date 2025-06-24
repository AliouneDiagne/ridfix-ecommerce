import React from 'react';
import styled from 'styled-components';

/**
 * Componente Stepper.
 * Mostra l'avanzamento in un processo multi-step (es. checkout).
 */
const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(2)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark}; /* Linea di base [9] */

  @media (max-width: 768px) {
    flex-wrap: wrap; // Permette il wrap dei passaggi su schermi piccoli
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; // Distribuisce lo spazio equamente

  // La linea di connessione tra i passi
  &:not(:first-child) {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 100%; // Copre lo spazio tra i cerchi
      height: 2px;
      background: ${({ theme, active }) => 
        active ? theme.colors.primary : theme.colors.surfaceLight}; /* Colore dinamico [9] */
      left: -50%; // Partenza dalla metà del precedente
      top: 15px; // Allinea con il centro del cerchio
      z-index: -1; // Sotto il cerchio
    }
  }

  @media (max-width: 768px) {
    flex: none; // Rimuovi flex:1 su mobile per evitare deformazioni
    width: auto;
    &:not(:first-child) {
      &::before {
        display: none; // Rimuovi la linea su mobile
      }
    }
  }
`;

const StepCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.surfaceDark}; /* Colore dinamico [9] */
  color: ${({ theme }) => theme.colors.onPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 1; // Sopra la linea
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  text-align: center;
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.textLight};
`;

const Stepper = ({ steps, currentStep }) => {
  return (
    <StepperContainer 
      role="progressbar" 
      aria-valuenow={currentStep + 1} 
      aria-valuemin={1} 
      aria-valuemax={steps.length}
    >
      {steps.map((label, index) => (
        <StepItem key={index} active={index <= currentStep}>
          <StepCircle active={index <= currentStep}>{index + 1}</StepCircle>
          <StepLabel active={index <= currentStep}>{label}</StepLabel>
        </StepItem>
      ))}
    </StepperContainer>
  );
};

export default Stepper;