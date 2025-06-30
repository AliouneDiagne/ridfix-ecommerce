import React from 'react';
import styled from 'styled-components';

const ReviewCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.cardBg};
`;

export default function SingleReview({ review }) {
  return (
    <ReviewCard>
      <strong>{review.name}</strong>&nbsp;
      <span>({review.rating}★)</span>
      <p style={{ marginTop: '0.5rem' }}>{review.comment}</p>
      <small>{new Date(review.date).toLocaleDateString()}</small>
    </ReviewCard>
  );
}
