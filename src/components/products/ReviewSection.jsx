import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; // Stella piena [32]
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // Stella vuota [32]

/**
 * Componente ReviewSection.
 * Mostra una lista di recensioni simulate per un prodotto.
 * Accetta un array di recensioni con nome, rating e commento.
 */
const SectionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight}; /* Sfondo sezione [9] */
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SectionTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text};
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark}; /* Linea divisoria tra recensioni [9] */
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const ReviewAuthor = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const RatingStars = styled.div`
  color: ${({ theme }) => theme.colors.primary}; /* Stelle in colore primario [9] */
`;

const ReviewComment = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.95rem;
`;

const NoReviewsMessage = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ReviewSection = ({ reviews }) => {
  return (
    <SectionContainer>
      <SectionTitle>Customer Reviews</SectionTitle>
      {reviews && reviews.length > 0 ? (
        <ReviewList>
          {reviews.map((review, index) => (
            <ReviewItem key={index}>
              <ReviewHeader>
                <ReviewAuthor>{review.name}</ReviewAuthor>
                <RatingStars>
                  {/* Renderizza stelle piene per il rating, poi stelle vuote per completare a 5 */}
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon 
                      key={i} 
                      icon={i < review.rating ? solidStar : regularStar} 
                    />
                  ))}
                </RatingStars>
              </ReviewHeader>
              <ReviewComment>{review.comment}</ReviewComment>
            </ReviewItem>
          ))}
        </ReviewList>
      ) : (
        <NoReviewsMessage>No reviews yet. Be the first to share your opinion!</NoReviewsMessage>
      )}
    </SectionContainer>
  );
};