import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa gli stili di React Toastify

import GlobalStyle from './styles/GlobalStyle'; // Stili globali dell'applicazione
import theme from './styles/theme'; // Tema per styled-components
import store from './store/store'; // Lo store Redux
import App from './App'; // Il componente principale dell'applicazione

// Crea il root per l'applicazione React
ReactDOM.createRoot(document.getElementById('root')).render(
  // Utilizza React.StrictMode per rilevare potenziali problemi nell'app durante lo sviluppo
  <React.StrictMode>
    {/* Provider di Redux per rendere lo store disponibile a tutti i componenti */}
    <Provider store={store}>
      {/* ThemeProvider di styled-components per applicare il tema globale */}
      <ThemeProvider theme={theme}>
        {/* GlobalStyle per applicare stili CSS globali a tutta l'app */}
        <GlobalStyle />
        {/* BrowserRouter per abilitare il routing client-side */}
        <BrowserRouter>
          {/* Il componente principale App, dove sono definite le rotte */}
          <App />
          {/* ToastContainer per visualizzare notifiche toast in tutta l'applicazione */}
          <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);