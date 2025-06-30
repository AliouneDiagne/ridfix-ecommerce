import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';

/* ─────────────────────────────────────────────
 *  Schema di validazione
 * ────────────────────────────────────────────*/
const shippingSchema = yup.object().shape({
  fullName:   yup.string().required('Full name is required'),
  address:    yup.string().required('Address is required'),
  city:       yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  phone:      yup.string().required('Phone number is required'),
});

/* ─────────────────────────────────────────────
 *  Styled components
 * ────────────────────────────────────────────*/
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 600px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

/* ─────────────────────────────────────────────
 *  Component
 * ────────────────────────────────────────────*/
export default function ShippingForm({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shippingSchema) });

  const onSubmit = async (data) => {
    try {
      // In un caso reale, qui potresti inviare o salvare i dati
      console.log('Shipping Data:', data);
      toast.success('Shipping information saved!');
      onNext(); // Avanza allo step successivo
    } catch (error) {
      toast.error(
        error?.message || 'Error saving shipping information.',
      );
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Full Name"
        name="fullName"
        {...register('fullName')}
        error={errors.fullName?.message}
      />
      <Input
        label="Address"
        name="address"
        {...register('address')}
        error={errors.address?.message}
      />
      <Input
        label="City"
        name="city"
        {...register('city')}
        error={errors.city?.message}
      />
      <Input
        label="Postal Code"
        name="postalCode"
        {...register('postalCode')}
        error={errors.postalCode?.message}
      />
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <ButtonGroup>
        <Button type="submit">Next Step</Button>
      </ButtonGroup>
    </FormContainer>
  );
}
