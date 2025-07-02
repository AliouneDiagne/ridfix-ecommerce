// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/api';
import Spinner from '../components/ui/Spinner';
import NotFoundPage from './NotFoundPage';

const Container = styled.div`
  padding: 2rem;
`;
const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;
const Button = styled.button`
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

function ProductsList() {
  const [products, setProducts] = useState(null);
  useEffect(() => { api.get('/products').then(res => setProducts(res.data)); }, []);
  if (!products) return <Spinner />;
  return (
    <>
      <h3>Manage Products</h3>
      <Link to="create"><Button>Create New Product</Button></Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>€{p.price?.toFixed(2)}</td>
              <td>
                <Link to={`edit/${p.id}`}><Button>Edit</Button></Link>
                <Link to={`delete/${p.id}`}><Button>Delete</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
function DummyPage({ action }) { return <p>{action} product page (to be implemented)</p>; }

export default function AdminPage() {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();

  // Redirect automatico: se sei su /admin → /admin/products
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/products" replace />;
  }
  // Solo admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Nav>
        <Link to="products"><Button>Products</Button></Link>
        <Link to="users"><Button>Users</Button></Link>
        <Link to="orders"><Button>Orders</Button></Link>
      </Nav>
      <Routes>
        <Route path="products/create" element={<DummyPage action="Create" />} />
        <Route path="products/edit/:id" element={<DummyPage action="Edit" />} />
        <Route path="products/delete/:id" element={<DummyPage action="Delete" />} />
        <Route path="products/*" element={<ProductsList />} />
        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}
