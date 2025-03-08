import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Optional alias for easier imports (e.g., import { something } from '@/components')
    },
  },
  server: {
    port: 3000,
  },
});
