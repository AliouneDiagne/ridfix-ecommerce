// Questo file contiene una funzione di utilità per il "debouncing".
// Il debouncing è una tecnica per ritardare l'esecuzione di una funzione
// fino a quando non è trascorso un certo periodo di tempo senza che la funzione sia stata richiamata.
// È utile per eventi che si verificano molto frequentemente, come la digitazione in un campo di ricerca.

// La funzione `debounce` prende due argomenti:
// - `func`: la funzione che si vuole "debounce"
// - `delay`: il tempo (in millisecondi) di attesa prima di eseguire la funzione
export const debounce = (func, delay) => {
  let timeoutId; // Variabile per tenere traccia del timer

  // Restituisce una nuova funzione che sarà quella effettivamente richiamata
  return (...args) => {
    // Ogni volta che la funzione debounced viene richiamata:
    // 1. Cancella il timer precedente (se esiste)
    clearTimeout(timeoutId);

    // 2. Imposta un nuovo timer
    timeoutId = setTimeout(() => {
      // Dopo il `delay`, esegue la funzione originale con gli argomenti passati
      func.apply(this, args); // `apply` mantiene il contesto `this` e passa gli argomenti come array
    }, delay);
  };
};