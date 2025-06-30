// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider }        from 'react-redux';
import { ThemeProvider }   from 'styled-components';
import { ToastContainer }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/GlobalStyle';
import theme       from './styles/theme';
import store       from './store/store';
import App         from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <BrowserRouter>
          <App />
        </BrowserRouter>

        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={3000}
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
