import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* ---------- styled ---------- */
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: auto;          /* footer sempre in fondo */
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing(2)} 0;
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;           /* migliore resa su mobile */
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

/* ---------- componente ---------- */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>© {year} Ridfix. All rights reserved.</p>

      <FooterLinks>
        <li><FooterLink to="/">Home</FooterLink></li>
        <li><FooterLink to="/catalog">Catalog</FooterLink></li>
        <li><FooterLink to="/about">About Us</FooterLink></li>
        <li><FooterLink to="/contact">Contact</FooterLink></li>
        {/* 🆕 link policy */}
        <li><FooterLink to="/policy">Privacy & Cookies</FooterLink></li>
      </FooterLinks>
    </FooterContainer>
  );
}
