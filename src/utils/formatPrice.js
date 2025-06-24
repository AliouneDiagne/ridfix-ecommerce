// Questo file contiene una funzione di utilità per formattare i prezzi.

// Esporta la funzione di default per la formattazione dei prezzi.
// Prende un valore numerico 'cents' (prezzo in centesimi) e lo converte in una stringa formattata.
export default function formatPrice(cents) {
  // Utilizza l'API Intl.NumberFormat per formattare il numero come valuta.
  // 'en-US' per un formato americano, ma possiamo cambiare a 'en-GB' o 'it-IT' per EUR.
  return new Intl.NumberFormat('en-US', {
    style: 'currency',   // Specifica che il formato è per una valuta
    currency: 'EUR',     // Specifica la valuta (Euro)
  }).format(cents / 100); // Converte i centesimi in euro (divide per 100) e formatta.
}