import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Simula el DOM de Node.js para las pruebas de UI
    setupFiles: ['src/setupTests.ts'], // Archivo para configurar Testing Library
    include: ['src/tests/**/*.test.{ts,tsx}'], // Para realizar la búsqueda de archivos
  },
});