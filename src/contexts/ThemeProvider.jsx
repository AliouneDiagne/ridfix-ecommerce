// src/contexts/ThemeProvider.jsx
import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(() => {
    if (localStorage.theme === 'dark') return 'dark';
    if (localStorage.theme === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.theme = mode;
  }, [mode]);

  const toggleTheme = () =>
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
