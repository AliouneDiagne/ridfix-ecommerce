import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import api from '../../api/api';

// Schema di validazione
const reviewSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  rating: yup
    .number()
    .typeError('Rating is required')
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars')
    .required('Rating is required'),
  comment: yup.string().required('Comment is required'),
});

// Styled form container
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius || '4px'};
`;

// Testarea per il commento
const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius || '4px'};
  background-color: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Messaggio di errore per textarea
const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger || '#ff4d4f'};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default function ReviewForm({ productId, onReviewSubmit }) {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // JSON-Server non ha endpoint /products/:id/reviews di default,
      // quindi inviamo a /reviews con productId incluso
      const response = await api.post('/reviews', {
        productId,
        ...data,
        date: new Date().toISOString(),
      });

      toast.success('Review submitted successfully!');
      if (onReviewSubmit) onReviewSubmit(response.data);
      reset();
    } catch (error) {
      toast.error('Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h5 style={{ color: theme.colors.text, marginBottom: '0.5rem' }}>Leave a Review</h5>

      <Input
        label="Your Name"
        type="text"
        name="name"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Rating (1–5)"
        type="number"
        name="rating"
        min="1"
        max="5"
        {...register('rating')}
        error={errors.rating?.message}
      />

      <label htmlFor="comment" style={{ color: theme.colors.text }}>
        Your Comment
      </label>
      <TextArea
        id="comment"
        placeholder="Write your review here..."
        {...register('comment')}
        aria-invalid={!!errors.comment}
        aria-describedby={errors.comment ? 'comment-error' : undefined}
      />
      {errors.comment && (
        <ErrorMessage id="comment-error" role="alert">
          {errors.comment.message}
        </ErrorMessage>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Submit Review'}
      </Button>
    </Form>
  );
}