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

/* ─────────────────────────────────────────────
 *  Schema di validazione
 * ────────────────────────────────────────────*/
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Formato email non valido')
    .required('Email obbligatoria'),
  password: yup
    .string()
    .min(6, 'La password deve contenere almeno 6 caratteri')
    .required('Password obbligatoria'),
});

/* ─────────────────────────────────────────────
 *  Stili container
 * ────────────────────────────────────────────*/
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

/* ─────────────────────────────────────────────
 *  Component
 * ────────────────────────────────────────────*/
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: authStatus, error: authError } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success(`Benvenuto, ${result.user.email}!`);
      navigate('/');
    } catch (error) {
      // usiamo "error" per rispettare ESLint (no-unused-vars)
      const message =
        authError || error?.message || 'Login fallito. Verifica le credenziali.';
      toast.error(message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

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

      <Button type="submit" disabled={authStatus === 'loading'}>
        {authStatus === 'loading' ? 'Accesso in corso...' : 'Accedi'}
      </Button>

      {authError && (
        <p style={{ color: 'red', textAlign: 'center' }}>{authError}</p>
      )}
    </FormContainer>
  );
}
