import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * Componente ProductSpecsTabs.
 * Mostra le specifiche tecniche e la compatibilità del prodotto in un'interfaccia a tab.
 */
const TabsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark}; /* Bordo inferiore per le tab [9] */
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  font-size: 1.1rem;
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.textLight}; /* Colore attivo [9] */
  border-bottom: 2px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'}; /* Sottolineatura attiva [9] */
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary}; // Accessibilità focus [2, 7]
    outline-offset: 2px;
  }
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surfaceLight}; /* Sfondo del contenuto [9] */
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
`;

const ProductSpecsTabs = ({ description, specifications, compatibility }) => {
  const [activeTab, setActiveTab] = useState('description'); // Tab attivo di default

  return (
    <TabsContainer>
      <TabButtons>
        <TabButton 
          active={activeTab === 'description'} 
          onClick={() => setActiveTab('description')}
        >
          Description
        </TabButton>
        <TabButton 
          active={activeTab === 'specifications'} 
          onClick={() => setActiveTab('specifications')}
        >
          Specifications
        </TabButton>
        <TabButton 
          active={activeTab === 'compatibility'} 
          onClick={() => setActiveTab('compatibility')}
        >
          Compatibility
        </TabButton>
      </TabButtons>
      <TabContent>
        {activeTab === 'description' && (
          <p>{description || 'No description available.'}</p>
        )}
        {activeTab === 'specifications' && (
          <ul>
            {specifications && specifications.length > 0 ? (
              specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))
            ) : (
              <li>No specifications available.</li>
            )}
          </ul>
        )}
        {activeTab === 'compatibility' && (
          <ul>
            {compatibility && compatibility.length > 0 ? (
              compatibility.map((comp, index) => (
                <li key={index}>{comp}</li>
              ))
            ) : (
              <li>No compatibility information available.</li>
            )}
          </ul>
        )}
      </TabContent>
    </TabsContainer>
  );
};

export default ProductSpecsTabs;