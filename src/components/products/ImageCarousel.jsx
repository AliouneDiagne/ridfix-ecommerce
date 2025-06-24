import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'; // Per animazioni carousel [7]

/**
 * Componente ImageCarousel.
 * Mostra un carosello di immagini per un prodotto, con navigazione e thumbnail.
 */
const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  position: relative; // Per posizionamento frecce [58]
`;

const MainImageContainer = styled.div`
  width: 100%;
  max-width: 600px; // Larghezza massima per l'immagine principale
  height: 400px; // Altezza fissa per l'immagine principale
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
`;

const MainImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain; // Mantiene le proporzioni [58]
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // Permetti il wrap delle thumbnail
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'}; // Bordo per thumbnail attiva [58]
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &.left { left: ${({ theme }) => theme.spacing(2)}; }
  &.right { right: ${({ theme }) => theme.spacing(2)}; }
`;

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <CarouselContainer>
      <MainImageContainer>
        <AnimatePresence initial={false} mode="wait">
          <MainImage
            key={currentImageIndex} // Key per far reagire AnimatePresence al cambio di immagine
            src={images[currentImageIndex]}
            alt={`Product image ${currentImageIndex + 1}`}
            initial={{ opacity: 0 }} // Animazione di ingresso
            animate={{ opacity: 1 }} // Animazione quando presente
            exit={{ opacity: 0 }} // Animazione di uscita
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <NavButton className="left" onClick={handlePrev} whileHover={{ scale: 1.1 }}>
              &larr;
            </NavButton>
            <NavButton className="right" onClick={handleNext} whileHover={{ scale: 1.1 }}>
              &rarr;
            </NavButton>
          </>
        )}
      </MainImageContainer>
      <ThumbnailContainer>
        {images.map((img, index) => (
          <Thumbnail
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            active={index === currentImageIndex}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </ThumbnailContainer>
    </CarouselContainer>
  );
};

export default ImageCarousel;