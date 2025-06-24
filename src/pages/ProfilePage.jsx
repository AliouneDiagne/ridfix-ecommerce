import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchUserProfile, clearUserProfile } from '../store/slices/usersSlice'

const Container = styled.div`
  padding: 2rem;
`
const Title = styled.h1`
  margin-bottom: 1rem;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

export default function ProfilePage() {
  const { profile, status } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserProfile())
    return () => dispatch(clearUserProfile())
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (!profile) return <p>No profile found.</p>

  return (
    <Container>
      <Title>My Profile</Title>
      <Info>
        <div><strong>Name:</strong> {profile.name}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>Role:</strong> {profile.role}</div>
      </Info>
    </Container>
  )
}
