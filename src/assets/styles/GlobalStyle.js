import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* Reset base */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  /* Font e colori di background/text dal tema */
  body {
    font-family: 'Arial', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  /* Link */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Pulsanti */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Inputs e textarea */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
`

export default GlobalStyle
