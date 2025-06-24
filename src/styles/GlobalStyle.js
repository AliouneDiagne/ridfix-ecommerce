import { createGlobalStyle } from 'styled-components';

// GlobalStyle è un componente di styled-components che permette di definire
// stili CSS che saranno iniettati globalmente nel documento.
const GlobalStyle = createGlobalStyle`
  /* CSS Reset di base per garantire una visualizzazione coerente su tutti i browser */
  *,
  *::before,
  *::after {
    box-sizing: border-box; /* Include padding e border nella dimensione totale dell'elemento */
  }

  /* Impostazioni globali per HTML e Body */
  html {
    font-size: 16px; /* Definisce la dimensione base del font, tutte le unità 'rem' saranno relative a questa */
  }

  body {
    margin: 0; /* Rimuove i margini di default del body */
    padding: 0; /* Rimuove il padding di default del body */
    /* Applica i colori di background e testo dal tema, con una transizione fluida */
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    /* Applica il font principale per il corpo del testo e l'altezza della linea */
    font-family: ${({ theme }) => theme.typography.fontFamilySecondary};
    line-height: 1.5; /* Altezza della linea per una migliore leggibilità */
    -webkit-font-smoothing: antialiased; /* Migliora il rendering del font su WebKit */
    -moz-osx-font-smoothing: grayscale; /* Migliora il rendering del font su Firefox */
    transition: background ${({ theme }) => theme.transitions.ease}, color ${({ theme }) => theme.transitions.ease}; /* Transizioni fluide per cambio tema */
  }

  /* Stili per i link */
  a {
    color: inherit; /* I link ereditano il colore del testo circostante */
    text-decoration: none; /* Rimuove la sottolineatura di default */
    cursor: pointer; /* Indica che l'elemento è cliccabile */
    transition: color ${({ theme }) => theme.transitions.ease}; /* Transizione fluida al passaggio del mouse */
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primaryLight}; /* Cambia colore al passaggio del mouse */
  }

  /* Stili per le immagini */
  img {
    max-width: 100%; /* Le immagini non superano la larghezza del loro contenitore */
    height: auto; /* Mantiene le proporzioni */
    display: block; /* Rimuove lo spazio extra sotto le immagini (se sono inline) */
  }

  /* Stili per elementi interattivi al focus (accessibilità) */
  /* Questo assicura che gli elementi siano visibili quando navigati tramite tastiera */
  button,
  input,
  select,
  textarea {
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary}; /* Bordo solido arancione al focus */
      outline-offset: 2px; /* Spazio tra il bordo e l'elemento */
      border-color: ${({ theme }) => theme.colors.primary}; /* Cambia colore del bordo (se presente) */
      box-shadow: 0 0 0 3px rgba(255, 76, 0, 0.3); /* Aggiunge un'ombra per maggiore visibilità */
    }
  }

  /* Stili per il div root dell'applicazione */
  #root {
    display: flex; /* Utilizza flexbox per il layout principale */
    flex-direction: column; /* Imposta la direzione del layout in colonna */
    min-height: 100vh; /* Assicura che il root occupi almeno l'intera altezza della viewport */
  }

  /* Stili per i titoli (utilizzando il font Poppins) */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamilyPrimary};
    color: ${({ theme }) => theme.colors.textLight};
    margin-top: ${({ theme }) => theme.spacing(3)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  /* Stili generici per contenitori o sezioni */
  section {
    padding: ${({ theme }) => theme.spacing(4)} 0; /* Padding verticale standard per le sezioni */
  }

  /* Stili per i container di larghezza fissa o massima */
  .container {
    max-width: 1200px; /* Larghezza massima del contenuto */
    margin: 0 auto; /* Centra il contenitore */
    padding: 0 ${({ theme }) => theme.spacing(2)}; /* Padding orizzontale */

    /* Media query per tablet e mobile */
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      max-width: 960px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      max-width: 720px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing(1)};
    }
  }
`;

export default GlobalStyle;