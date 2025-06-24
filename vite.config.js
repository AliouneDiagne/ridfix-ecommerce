import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Usa SWC per velocità

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta di default per Vite, puoi cambiarla
  },
  resolve: {
    alias: {
      // Configura un alias per semplificare gli import da 'src/'
      '@': '/src',
    },
  },
});