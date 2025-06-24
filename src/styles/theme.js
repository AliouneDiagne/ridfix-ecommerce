// Questo file definisce il tema globale dell'applicazione utilizzando styled-components.
// Contiene la palette di colori, le impostazioni di spaziatura, la tipografia e altro.
// È progettato per supportare una modalità scura (Dark Mode) con accenti arancioni.

const theme = {
  // Colori principali per il tema scuro con accenti arancioni
  colors: {
    // Colori di base dello sfondo e delle superfici (seguono Material Design Dark Theme)
    background: '#121212', // Sfondo principale scuro
    surface: '#1E1E1E',    // Colore delle schede, card, modali (leggermente più chiaro del background)
    surfaceDark: '#0A0A0A', // Colore per elementi molto scuri o in profondità
    surfaceLight: '#2A2A2A', // Colore per elementi leggermente più chiari, es. hover su liste

    // Colori del testo per garantire leggibilità sul tema scuro
    text: '#E0E0E0',      // Testo primario (molto chiaro)
    textSecondary: '#B0B0B0', // Testo secondario (leggermente meno prominente)
    textLight: '#FFFFFF', // Testo bianco puro per contrasto massimo
    textDark: '#000000', // Testo nero puro (usato raramente in dark mode, ma utile per certi elementi)

    // Colori degli accenti e interattivi (arancione brand Ridfix)
    primary: '#FF4C00',   // Arancione primario (usato per bottoni, link attivi, highlights)
    primaryDark: '#D43F00', // Arancione più scuro per stati hover/active
    primaryLight: '#FF7033', // Arancione più chiaro per sfumature o sottili accenti

    // Colori di feedback per stati (successo, errore, avviso)
    success: '#4CAF50',   // Verde per successo
    error: '#F44336',     // Rosso per errore
    warning: '#FFC107',   // Giallo per avviso
    info: '#2196F3',      // Blu per informazioni

    // Colori per bordi e separatori
    border: '#424242',    // Colore dei bordi sottili e divisori
    divider: '#333333',   // Colore per linee divisorie più evidenti

    // Colore per gli stati di disabled
    disabled: '#616161',  // Colore per elementi disabilitati
  },

  // Spaziature (sistema modulare basato su una griglia di 8px)
  // Questo rende il design coerente e scalabile.
  spacing: (factor = 1) => `${factor * 8}px`, // Funzione helper per ottenere spaziatura in base a un fattore
  // Esempio d'uso: padding: ${theme.spacing(2)}; => 16px

  // Tipografia (font families, sizes, weights)
  typography: {
    fontFamilyPrimary: "'Poppins', sans-serif", // Per titoli e elementi prominenti
    fontFamilySecondary: "'Inter', sans-serif", // Per testi di corpo, paragrafi

    // Dimensioni dei font (scala modulare)
    fontSize: {
      xs: '0.75rem',  // 12px
      sm: '0.875rem', // 14px
      md: '1rem',     // 16px (base)
      lg: '1.125rem', // 18px
      xl: '1.25rem',  // 20px
      h1: '3rem',     // 48px
      h2: '2.25rem',   // 36px
      h3: '1.75rem',   // 28px
      h4: '1.5rem',    // 24px
      h5: '1.25rem',   // 20px
      h6: '1rem',      // 16px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },

  // Bordi e ombre
  borderRadius: '8px', // Raggio standard per angoli arrotondati
  boxShadow: {
    sm: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    md: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    lg: '0px 10px 15px rgba(0, 0, 0, 0.4)',
  },

  // Breakpoints per il responsive design (mobile-first)
  breakpoints: {
    sm: '576px',  // Piccolo mobile
    md: '768px',  // Tablet o mobile grande
    lg: '992px',  // Desktop piccolo
    xl: '1200px', // Desktop grande
  },

  // Transizioni standard per effetti fluidi
  transitions: {
    ease: 'all 0.3s ease-in-out',
  },
};

export default theme; // Esporta il tema per l'uso con ThemeProvider