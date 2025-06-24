// src/pages/LoginForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../store/slices/authSlice'; // Assicurati che il path sia corretto
import { toast } from 'react-toastify'; // Per le notifiche toast
import Button from '../components/ui/Button'; // Componente Button riutilizzabile

// Schema di validazione con Yup
// Definisce le regole per i campi email e password
const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'), // Validazione formato email e campo obbligatorio
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'), // Lunghezza minima e campo obbligatorio
}).required();

// Stili con Styled Components per il form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)}; /* Spazio tra gli elementi del form */
  max-width: 400px;
  margin: auto; /* Centra il form */
`;

// Stili per gli input
const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.lightBg};
  color: ${({ theme }) => theme.colors.text};
`;

// Stili per i messaggi di errore
const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.colors.danger}; /* Colore rosso per gli errori */
  font-size: 0.875rem;
  aria-live: polite; /* Importante per l'accessibilità: annuncia gli errori agli screen reader */
`;

// Componente LoginForm
export default function LoginForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(s => s.auth); // Legge lo stato di autenticazione (loading, success, error) dal Redux store

  // Configura React Hook Form con Yup Resolver
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema) // Collega Yup allo schema di validazione
  });

  // Funzione chiamata al submit del form, solo se la validazione ha successo
  const onSubmit = data => dispatch(loginUser(data)); // Invia le credenziali allo slice Redux per il login

  // Effetto collaterale per mostrare le notifiche toast in caso di errore di login
  useEffect(() => {
    if (error) toast.error(`Login failed: ${error}`); // Mostra un toast di errore se c'è un problema
  }, [error]); // Dipendenza dall'oggetto 'error' del Redux store

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate> {/* handleSubmit gestisce la validazione prima di chiamare onSubmit */}
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          {...register('email')} // Registra l'input con React Hook Form
          placeholder="Enter your email"
        />
        {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo */}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          {...register('password')} // Registra l'input con React Hook Form
          placeholder="Enter your password"
        />
        {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo */}
      </div>

      {/* Pulsante di submit, disabilitato durante il caricamento */}
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in…' : 'Login'}
      </Button>
    </Form>
  );
}