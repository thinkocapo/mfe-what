import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import {
  makeFetchTransport,
  makeMultiplexedTransport,
  moduleMetadataIntegration,
} from '@sentry/browser';
import App from './App';

Sentry.init({
  // Shell / fallback DSN — receives any event not matched to an MFE project
  dsn: import.meta.env.VITE_SENTRY_DSN || '',

  integrations: [
    // Reads bundle metadata injected by @sentry/vite-plugin into each remote
    // MFE's build, and attaches it to matching stack frames on error events.
    moduleMetadataIntegration(),

    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),

    Sentry.replayIntegration(),
  ],

  // makeMultiplexedTransport routes each envelope to the DSN found in the
  // module_metadata of the MFE bundle that produced the error.
  // Falls back to the default DSN above when no metadata is present
  // (e.g. errors originating in the shell itself).
  transport: makeMultiplexedTransport(
    makeFetchTransport,
    ({ getEvent }) => {
      // Handle error events
      const event = getEvent(['event']);
      const frames = event?.exception?.values?.[0]?.stacktrace?.frames;

      if (frames) {
        // Walk frames from the inside out; the last frame with metadata is
        // the most-specific MFE bundle. Return it as the routing target.
        const match = [...frames]
          .reverse()
          .find((f) => f.module_metadata?.dsn);

        if (match) {
          return [
            {
              dsn: match.module_metadata.dsn,
              // Pass release through if it was injected too
              ...(match.module_metadata.release
                ? { release: match.module_metadata.release }
                : {}),
            },
          ];
        }
      }

      // No MFE metadata found — send to the fallback (shell) project
      return [];
    },
  ),

  // Capture 100% of traces — tune down in production
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost'],

  // Session replay at 100% for local visibility
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,

  environment: import.meta.env.MODE,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SentryRoutes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </SentryRoutes>
    </BrowserRouter>
  </React.StrictMode>
);
