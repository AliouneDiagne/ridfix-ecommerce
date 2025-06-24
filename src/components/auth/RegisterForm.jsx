import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slices/authSlice'; // Assumi un'azione registerUser nello slice auth [77]
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/**
 * Schema di validazione per il form di registrazione con Yup. [58]
 */
const registerSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match') // Deve corrispondere alla password
    .required('Confirm password is required'),
});

/**
 * Componente RegisterForm.
 * Form per la registrazione di nuovi utenti.
 */
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 400px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status); // Stato del processo di registrazione
  const authError = useSelector(state => state.auth.error); // Errore dal processo di registrazione

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Simula la registrazione. In un'app reale, si invierebbe a un'API backend. [58]
      // L'azione registerUser dovrebbe essere definita nel tuo authSlice.
      const resultAction = await dispatch(registerUser(data)).unwrap(); 
      toast.success(`Registration successful! Welcome, ${resultAction.user.firstName}!`); // Notifica di successo
      navigate('/login'); // Reindirizza al login dopo la registrazione
    } catch (error) {
      toast.error(authError || 'Registration failed. Please try again.'); // Notifica di errore
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'inherit' }}>Register</h2>
      <Input
        label="First Name"
        name="firstName"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        name="lastName"
        {...register('lastName')}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" disabled={authStatus === 'loading'}>
        {authStatus === 'loading' ? 'Registering...' : 'Register'}
      </Button>
      {authError && <p style={{ color: 'red', textAlign: 'center' }}>{authError}</p>}
    </FormContainer>
  );
};

export default RegisterForm;