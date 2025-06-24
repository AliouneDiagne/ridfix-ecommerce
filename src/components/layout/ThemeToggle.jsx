import React, { useState, useEffect } from 'react';

/**
 * Componente ThemeToggle
 * Permette di passare da tema chiaro a scuro e viceversa.
 * Salva la scelta in localStorage e applica la classe `dark` al tag <html>.
 */
function ThemeToggle() {
  // Inizializza il tema leggendo da localStorage o dalle preferenze di sistema
  const [dark, setDark] = useState(() => {
    if (localStorage.theme === 'dark') return true;
    if (localStorage.theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Applica la classe 'dark' al <html> e aggiorna localStorage quando cambia il tema
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [dark]);

  // Inverte lo stato del tema
  const toggleTheme = () => setDark(prev => !prev);

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 text-lg rounded transition bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;

