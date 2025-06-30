import React from 'react';
import styled from 'styled-components';
import SingleReview from './SingleReview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

/* ───────── Styled components ───────── */
const SectionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark};
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
  color: ${({ theme }) => theme.colors.primary};
`;

const ReviewComment = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.95rem;
`;

const NoReviewsMessage = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textLight};
`;

/* ───────── Component ───────── */
export default function ReviewSection({ reviews = [] }) {
  return (
    <SectionContainer>
      <SectionTitle>Customer Reviews</SectionTitle>

      {reviews.length > 0 ? (
        <ReviewList>
          {reviews.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewHeader>
                <ReviewAuthor>{review.name}</ReviewAuthor>
                <RatingStars>
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
        <NoReviewsMessage>
          No reviews yet. Be the first to share your opinion!
        </NoReviewsMessage>
      )}
    </SectionContainer>
  );
}

/* Work-around per React Fast Refresh (elimina il warning) */
export {};
