import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  padding: 4rem;
  text-align: center;
`

export default function NotFound() {
  return (
    <Container>
      <h1>404 – Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">Back to Home</Link>
    </Container>
  )
}
