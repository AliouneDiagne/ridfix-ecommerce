import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Componente HeroBanner per la Home Page.
 * Presenta un messaggio accattivante e una call-to-action.
 */
const BannerContainer = styled(motion.section)`
  background-image: url('/images/hero-scooter.jpg'); /* Immagine di sfondo (assicurati esista in public/images) [101] */
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)}; /* Ampio padding [9] */
  height: 400px; // Altezza fissa
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; // Per il gradiente overlay

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); // Overlay scuro per migliorare la leggibilità del testo
    z-index: 1;
  }
`;

const BannerContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const BannerTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.onPrimary};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5); // Ombra per migliore visibilità
`;

const BannerSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.onPrimary};
  opacity: 0.9;
`;

const ShopNowButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || '#E65100'};
  }
`;

const HeroBanner = () => {
  return (
    <BannerContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BannerContent
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <BannerTitle>All You Need for Your Scooter</BannerTitle>
        <BannerSubtitle>Discover top-quality spare parts and accessories from trusted Italian brands.</BannerSubtitle>
        <ShopNowButton to="/catalog">Shop Now</ShopNowButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default HeroBanner;