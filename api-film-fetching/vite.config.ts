import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Simular el DOM de Node.js para las pruebas de la UI
    setupFiles: ['src/setupTests.ts'], // Configuracion genérica adicional para funcionalidad extra en los tests
  },
})