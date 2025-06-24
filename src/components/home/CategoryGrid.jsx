import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from '../ui/Skeleton';

/**
 * Componente CategoryGrid.
 * Mostra le categorie principali in una griglia, con link al catalogo filtrato.
 */
const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  justify-items: center;
`;

const CategoryCard = styled(Link)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px; // Altezza minima per le card
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${({ theme }) => theme.colors.surfaceDark};
  }
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: 0;
`;

const CategoryGrid = () => {
  // Assumi che le categorie siano caricate nello slice products o in un categoriesSlice separato
  const { categories, status, error } = useSelector(state => state.products); // Prendiamo le categorie dallo store [70]

  if (status === 'loading') {
    return (
      <SectionContainer>
        <SectionTitle>Shop by Category</SectionTitle>
        <Grid>
          {[...Array(6)].map((_, i) => ( // Mostra 6 skeleton per le categorie
            <Skeleton key={i} width="180px" height="150px" />
          ))}
        </Grid>
      </SectionContainer>
    );
  }

  if (status === 'failed') {
    return (
      <SectionContainer>
        <SectionTitle>Shop by Category</SectionTitle>
        <p style={{ textAlign: 'center', color: 'red' }}>Error loading categories: {error}</p>
      </SectionContainer>
    );
  }

  if (categories.length === 0) {
    return null; // Non mostrare la sezione se non ci sono categorie
  }

  return (
    <SectionContainer>
      <SectionTitle>Shop by Category</SectionTitle>
      <Grid>
        {categories.map(category => (
          <CategoryCard key={category.id} to={`/catalog?category=${category.name}`}> {/* Link al catalogo filtrato per categoria [36] */}
            {/* Qui potresti aggiungere un'icona per la categoria */}
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default CategoryGrid;