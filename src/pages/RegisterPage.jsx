import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { registerUser } from '../store/slices/usersSlice';
import Spinner from '../components/ui/Spinner';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  padding: .75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;
const Button = styled.button`
  padding: .75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: .9; }
`;
const Error = styled.div`
  color: #ff4d4f;
  font-size: .875rem;
  text-align: center;
`;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.users);

  // Local state per form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Se registrazione andata a buon fine, redirect al login
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/login');
    }
  }, [status, navigate]);

  // Al submit, dispatch dell’azione di register
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <Container>
      <Title>Register</Title>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign Up</Button>
        </Form>
      )}
      {status === 'failed' && error && <Error>{error}</Error>}
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Container>
  );
}
