import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfe_header: 'http://localhost:4001/assets/remoteEntry.js',
        mfe_one: 'http://localhost:4002/assets/remoteEntry.js',
        mfe_two: 'http://localhost:4003/assets/remoteEntry.js',
        mfe_three: 'http://localhost:4004/assets/remoteEntry.js',
        mfe_four: 'http://localhost:4005/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
});
