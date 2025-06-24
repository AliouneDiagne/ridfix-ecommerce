import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../api/api'
import Spinner from '../components/ui/Spinner'
import NotFound from './NotFound'

const Container = styled.div`
  padding: 2rem;
`
const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td { padding: .5rem; border: 1px solid ${({ theme }) => theme.colors.border}; }
`
const Button = styled.button`
  padding: .25rem .5rem;
  margin-right: .5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: .9; }
`

function ProductsList() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data))
  }, [])

  if (!products) return <Spinner />

  return (
    <>
      <h3>Manage Products</h3>
      <Link to="create"><Button>Create New Product</Button></Link>
      <Table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>€{p.price.toFixed(2)}</td>
              <td>
                <Link to={`edit/${p.id}`}><Button>Edit</Button></Link>
                <Link to={`delete/${p.id}`}><Button>Delete</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

// Placeholder per Create/Edit/Delete
function DummyPage({ action }) {
  return <p>{action} product page (to be implemented)</p>
}

export default function AdminPage() {
  const { user } = useSelector(s => s.auth)
  const navigate = useNavigate()

  // solo admin può accedere
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Nav>
        <Link to="products"><Button>Products</Button></Link>
        <Link to="users"><Button>Users</Button></Link>
        <Link to="orders"><Button>Orders</Button></Link>
      </Nav>

      <Routes>
        <Route path="products/*" element={<ProductsList />} />
        <Route path="products/create" element={<DummyPage action="Create" />} />
        <Route path="products/edit/:id" element={<DummyPage action="Edit" />} />
        <Route path="products/delete/:id" element={<DummyPage action="Delete" />} />
        {/* Puoi replicare simile per users e orders */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  )
}
