// src/components/auth/LoginForm.jsx

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object().shape({
  email: yup.string().email('Formato email non valido').required('Email obbligatoria'),
  password: yup.string().min(6, 'La password deve contenere almeno 6 caratteri').required('Password obbligatoria'),
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

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const authError = useSelector(state => state.auth.error);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      const user = result?.user || result?.payload || data;
      toast.success(`Benvenuto, ${user.email || user.name || 'utente'}!`);
      navigate('/');
    } catch (error) {
      toast.error(authError || error?.message || 'Login fallito. Verifica le credenziali.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

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
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Button type="submit" disabled={authStatus === 'loading'}>
        {authStatus === 'loading' ? 'Accesso in corso...' : 'Accedi'}
      </Button>

      {authError && (
        <p style={{ color: 'red', textAlign: 'center' }}>{authError}</p>
      )}
    </FormContainer>
  );
}
