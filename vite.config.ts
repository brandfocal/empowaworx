import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// Force restart
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5175,
    hmr: {
      overlay: false,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        vipLegacy: path.resolve(__dirname, 'vip-legacy-recognition-honoring-dr-david-molapo/index.html'),
        legacy: path.resolve(__dirname, 'legacy/index.html'),
      },
    },
  },
});
