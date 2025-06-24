// src/pages/NotFoundPage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button'; // Assicurati che il percorso sia corretto

// Stili con Styled Components per il contenitore della pagina
const Wrap = styled.div`
  padding: ${({ theme }) => theme.spacing(4)}; /* Aggiunge padding basato sul tema */
  text-align: center; /* Centra il contenuto */
  max-width: 600px; /* Limita la larghezza per una migliore leggibilità */
  margin: auto; /* Centra la pagina orizzontalmente */
  background-color: ${({ theme }) => theme.colors.lightBg}; /* Utilizza un colore di sfondo dal tema se disponibile, altrimenti lightBg predefinito */
  border-radius: ${({ theme }) => theme.borderRadius}; /* Bordi arrotondati */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Ombra per profondità */
  color: ${({ theme }) => theme.colors.text}; /* Colore del testo */
`;

// Stili per il titolo "404"
const Title = styled.h1`
  font-size: 4rem; /* Dimensione del font grande per il numero 404 */
  color: ${({ theme }) => theme.colors.primary}; /* Colore primario del tema (arancione) */
  margin-bottom: ${({ theme }) => theme.spacing(2)}; /* Spazio sotto il titolo */
`;

// Stili per il messaggio di errore
const Msg = styled.p`
  font-size: 1.2rem; /* Dimensione del font per il messaggio */
  margin-top: ${({ theme }) => theme.spacing(2)}; /* Spazio sopra il messaggio */
  margin-bottom: ${({ theme }) => theme.spacing(4)}; /* Spazio sotto il messaggio */
  line-height: 1.6; /* Altezza della linea per leggibilità */
`;

/**
 * Componente NotFoundPage
 * Visualizza una pagina di errore 404 per le rotte inesistenti.
 * Reindirizza l'utente alla homepage tramite un pulsante.
 */
export default function NotFoundPage() {
  return (
    <Wrap>
      <Title>404</Title> {/* Titolo principale della pagina di errore */}
      <Msg>Oops… Questa pagina non esiste.</Msg> {/* Messaggio di errore [1] */}
      {/* Link al pulsante "Torna alla Home" */}
      <Link to="/">
        <Button>Torna alla Home</Button> {/* Utilizza il componente Button per il reindirizzamento [1] */}
      </Link>
    </Wrap>
  );
}