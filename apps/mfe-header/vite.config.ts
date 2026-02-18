import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  // loadEnv with '' prefix loads ALL vars, not just VITE_-prefixed ones,
  // so SENTRY_DSN is available here at build time without being exposed
  // to the browser bundle.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),

      // Injects moduleMetadata into every JS chunk produced by this build.
      // moduleMetadataIntegration() in the shell reads this metadata off
      // stack frames so makeMultiplexedTransport can route errors here.
      sentryVitePlugin({
        moduleMetadata: {
          dsn: env.SENTRY_DSN || '',
          app: 'mfe-header',
        },
        // We only want metadata injection — no sourcemap upload.
        sourcemaps: { disable: true },
        telemetry: false,
      }),

      federation({
        name: 'mfe_header',
        filename: 'remoteEntry.js',
        exposes: { './App': './src/App.tsx' },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      sourcemap: true, // required for moduleMetadata frame matching
    },
    server: { port: 4001 },
    preview: { port: 4001 },
  };
});
