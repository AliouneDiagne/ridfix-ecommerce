import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: ${({ theme }) => theme.spacing(0.5)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const STATUS_OPTIONS = ['pending', 'shipped', 'delivered', 'cancelled'];

/**
 * Dropdown per la selezione dello stato dell'ordine.
 *
 * @param {string} orderId - ID dell'ordine.
 * @param {string} currentStatus - Stato attuale dell'ordine.
 * @param {Function} onStatusChange - Callback da eseguire al cambio di stato.
 */
export default function OrderStatusDropdown({ orderId, currentStatus, onStatusChange }) {
  const handleChange = (e) => {
    onStatusChange(orderId, e.target.value);
  };

  return (
    <StyledSelect value={currentStatus} onChange={handleChange}>
      {STATUS_OPTIONS.map(status => (
        <option key={status} value={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalizza la prima lettera */}
        </option>
      ))}
    </StyledSelect>
  );
}