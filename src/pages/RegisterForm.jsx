// src/pages/RegisterForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice'; // Assicurati che il path sia corretto
import { toast } from 'react-toastify'; // Per le notifiche toast
import Button from '../components/ui/Button'; // Componente Button riutilizzabile
import { Link } from 'react-router-dom'; // Per il link alla pagina di Login

// Schema di validazione con Yup
// Definisce le regole per tutti i campi del form di registrazione
const schema = yup.object({
  firstName: yup.string().required('First Name is required'), // Campo obbligatorio [4]
  lastName: yup.string().required('Last Name is required'),   // Campo obbligatorio [7]
  email: yup.string().email('Invalid email format').required('Email is required'), // Validazione formato email e campo obbligatorio [7]
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'), // Lunghezza minima e campo obbligatorio [7, 8]
  confirm: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm Password is required'), // Convalida che coincida con la password [7]
}).required();

// Stili con Styled Components per il form [9, 10]
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)}; /* Spazio tra gli elementi del form [9] */
  max-width: 400px;
  margin: auto; /* Centra il form [9] */
  background-color: ${({ theme }) => theme.colors.lightBg}; /* Colore di sfondo del form */
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  color: ${({ theme }) => theme.colors.text};
`;

// Stili per gli input [7]
const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.lightBg};
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary}; /* Outline per accessibilità [11] */
    outline-offset: 2px;
  }
`;

// Stili per i messaggi di errore [5, 12]
const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.colors.danger}; /* Colore rosso per gli errori [5] */
  font-size: 0.875rem;
  aria-live: polite; /* Importante per l'accessibilità: annuncia gli errori agli screen reader [5] */
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// Componente RegisterForm
export default function RegisterForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(s => s.auth); // Legge lo stato di autenticazione (loading, success, error) dal Redux store [5]

  // Configura React Hook Form con Yup Resolver [5, 13]
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema) // Collega Yup allo schema di validazione [5]
  });

  // Funzione chiamata al submit del form, solo se la validazione ha successo [6]
  const onSubmit = data => {
    dispatch(registerUser({ // Invia i dati allo slice Redux per la registrazione [6]
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }));
  };

  // Effetto collaterale per mostrare le notifiche toast in caso di successo o errore di registrazione [6]
  useEffect(() => {
    if (status === 'succeeded') toast.success('Registration successful! Welcome 🎉'); // Notifica di successo [6]
    if (status === 'failed') toast.error(`Registration error: ${error}`); // Notifica di errore [6]
  }, [status, error]); // Dipendenza dallo stato 'status' e 'error' del Redux store

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate> {/* handleSubmit gestisce la validazione prima di chiamare onSubmit [14] */}
      <FormTitle>Register</FormTitle> {/* Titolo del form */}

      <div>
        <label htmlFor="firstName">First Name</label>
        <Input
          id="firstName"
          type="text"
          {...register('firstName')} // Registra l'input con React Hook Form [6]
          placeholder="Enter your first name"
        />
        {errors.firstName && <ErrorMsg>{errors.firstName.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo [6] */}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <Input
          id="lastName"
          type="text"
          {...register('lastName')} // Registra l'input con React Hook Form [6]
          placeholder="Enter your last name"
        />
        {errors.lastName && <ErrorMsg>{errors.lastName.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo [6] */}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          {...register('email')} // Registra l'input con React Hook Form [6]
          placeholder="Enter your email"
        />
        {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo [6] */}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          {...register('password')} // Registra l'input con React Hook Form [6]
          placeholder="Create a password"
        />
        {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo [15] */}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirm')} // Registra l'input con React Hook Form [15]
          placeholder="Confirm your password"
        />
        {errors.confirm && <ErrorMsg>{errors.confirm.message}</ErrorMsg>} {/* Mostra l'errore sotto il campo [15] */}
      </div>

      {/* Pulsante di submit, disabilitato durante il caricamento [15, 16] */}
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Registering…' : 'Register'}
      </Button>

      <p style={{textAlign: 'center'}}>
        Already have an account?{' '}
        <StyledLink to="/login">Login</StyledLink> {/* Link alla pagina di Login [15, 17] */}
      </p>
    </Form>
  );
}