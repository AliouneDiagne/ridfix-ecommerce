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

const ROLE_OPTIONS = ['user', 'admin'];

/**
 * Dropdown per la selezione del ruolo utente.
 *
 * @param {string} userId - ID dell'utente.
 * @param {string} currentRole - Ruolo attuale dell'utente.
 * @param {Function} onRoleChange - Callback da eseguire al cambio di ruolo.
 */
export default function UserRoleSelect({ userId, currentRole, onRoleChange }) {
  const handleChange = (e) => {
    onRoleChange(userId, e.target.value);
  };

  return (
    <StyledSelect value={currentRole} onChange={handleChange}>
      {ROLE_OPTIONS.map(role => (
        <option key={role} value={role}>
          {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalizza la prima lettera */}
        </option>
      ))}
    </StyledSelect>
  );
}