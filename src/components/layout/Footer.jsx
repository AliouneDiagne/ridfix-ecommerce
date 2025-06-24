import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Componente Footer.
 * Contiene informazioni di copyright e link rapidi.
 */
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface}; /* Sfondo scuro [9] */
  color: ${({ theme }) => theme.colors.textLight}; /* Testo più chiaro [9] */
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: auto; /* Per fissare il footer in fondo alla pagina */
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing(2)} 0;
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Ridfix. All rights reserved.</p>
      <FooterLinks>
        <li><FooterLink to="/">Home</FooterLink></li>
        <li><FooterLink to="/catalog">Catalog</FooterLink></li>
        <li><FooterLink to="/about">About Us</FooterLink></li>
        <li><FooterLink to="/contact">Contact</FooterLink></li>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;