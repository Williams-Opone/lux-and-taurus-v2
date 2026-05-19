import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 800, // Raises the warning ceiling from 500kB to 800kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Drops heavy libraries like framer-motion into their own optimized bundle chunks
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            return 'vendor-core';
          }
        },
      },
    },
  },
});