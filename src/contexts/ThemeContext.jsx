// src/contexts/ThemeContext.jsx
import { createContext } from 'react';

export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {}
});
