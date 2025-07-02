// src/components/auth/RegisterForm.jsx

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slices/authSlice';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 400px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const authError = useSelector(state => state.auth.error);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      const user = result?.payload || result?.user || data;
      toast.success(`Registration successful! Welcome, ${user.firstName || 'user'}!`);
      navigate('/login');
    } catch (error) {
      toast.error(authError || error?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
      <Input
        label="First Name"
        name="firstName"
        id="firstName"
        autoComplete="given-name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        name="lastName"
        id="lastName"
        autoComplete="family-name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        name="email"
        id="email"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        name="password"
        id="password"
        type="password"
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" disabled={authStatus === 'loading'}>
        {authStatus === 'loading' ? 'Registering...' : 'Register'}
      </Button>
      {authError && (
        <p style={{ color: 'red', textAlign: 'center' }}>{authError}</p>
      )}
    </FormContainer>
  );
}

