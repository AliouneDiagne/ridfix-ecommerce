import { useState, useEffect } from 'react';

// Custom hook per gestire lo stato persistente nel localStorage
function useLocalStorage(key, initialValue) {
  // Funzione per inizializzare lo stato leggendo dal localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parsa il JSON se esiste, altrimenti usa il valore iniziale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se c'è un errore (es. JSON non valido), logga l'errore e restituisci il valore iniziale
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // useEffect per aggiornare il localStorage ogni volta che storedValue cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Logga errori durante la scrittura nel localStorage
      console.warn(`Error writing localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]); // Dipendenze: la chiave e il valore dello stato

  // Restituisce il valore dello stato e la funzione per aggiornarlo
  return [storedValue, setStoredValue];
}

export default useLocalStorage;