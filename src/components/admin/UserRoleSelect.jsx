import React from 'react';
import PropTypes from 'prop-types';
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

export default function UserRoleSelect({
  userId,
  currentRole,
  onRoleChange,
  ...rest
}) {
  const handleChange = (e) => {
    onRoleChange(userId, e.target.value);
  };

  return (
    <StyledSelect
      value={currentRole}
      onChange={handleChange}
      aria-label="User role"
      {...rest}
    >
      {ROLE_OPTIONS.map((role) => (
        <option key={role} value={role}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </option>
      ))}
    </StyledSelect>
  );
}

UserRoleSelect.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currentRole: PropTypes.string.isRequired,
  onRoleChange: PropTypes.func.isRequired,
};
