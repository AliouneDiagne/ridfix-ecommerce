// src/components/products/StockInfo.jsx
import React from "react";
import styled from "styled-components";

const StockSpan = styled.span`
  font-weight: bold;
  color: ${({ inStock, theme }) =>
    inStock > 0 ? theme.colors.success || "#28a745" : theme.colors.danger || "#dc3545"};
`;

export default function StockInfo({ inStock, children }) {
  return (
    <StockSpan inStock={inStock} aria-live="polite">
      {children}
    </StockSpan>
  );
}
