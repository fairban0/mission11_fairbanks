import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist', // where Vite will output the built site
  },
  base: './', // ensures paths work when deployed, especially on Azure
});


