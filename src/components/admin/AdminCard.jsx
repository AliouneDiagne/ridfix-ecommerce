import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h4`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardValue = styled.p`
  font-size: 2.5em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CardIcon = styled.span`
  font-size: 2em;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.textLight};
`;

/**
 * Componente Card per le statistiche Admin.
 *
 * @param {string} title - Titolo della card (es. "Totale Ordini").
 * @param {string|number} value - Valore da visualizzare (es. "123").
 * @param {string} [icon] - Icona opzionale da mostrare.
 */
export default function AdminCard({ title, value, icon }) {
  return (
    <Card>
      {icon && <CardIcon>{icon}</CardIcon>}
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
    </Card>
  );
}