import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      sentryVitePlugin({
        moduleMetadata: {
          dsn: env.SENTRY_DSN || '',
          app: 'mfe-three',
        },
        sourcemaps: { disable: true },
        telemetry: false,
      }),
      federation({
        name: 'mfe_three',
        filename: 'remoteEntry.js',
        exposes: { './App': './src/App.tsx' },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      sourcemap: true,
    },
    server: { port: 4004 },
    preview: { port: 4004 },
  };
});
