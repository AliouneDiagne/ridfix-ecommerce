import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { loginUser } from '../store/slices/authSlice'
import Spinner from '../components/ui/Spinner'

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Input = styled.input`
  padding: .75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`
const Button = styled.button`
  padding: .75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: .9; }
`
const Error = styled.div`
  color: #ff4d4f;
  font-size: .875rem;
  text-align: center;
`

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error, token } = useSelector(state => state.auth)

  // Local state per email e password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Se già loggato, redirige alla home
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  // Al submit, dispatch dell’azione di login
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    <Container>
      <Title>Login</Title>
      {status === 'loading' && <Spinner />}
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Sign In</Button>
      </Form>
      {status === 'failed' && <Error>{error}</Error>}
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        New here? <Link to="/register">Register</Link>
      </p>
      <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center', marginTop: '1rem' }}>
  Demo credentials – Admin: <strong>admin@ridfix.io / admin123</strong>,&nbsp;
  User: <strong>user@ridfix.io / user123</strong>
</p>

    </Container>
  )
}
