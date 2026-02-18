# mfe-what

5-MFE microfrontend monorepo — React + Vite + pnpm + Nx + Module Federation + Sentry

## Layout

```
┌─────────────────────────────────────────────────┐
│  mfe-header  (:4001)   [ ↺ REFRESH ALL MFEs ]   │
└─────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────┐
│  mfe-one  (:4002)    │  mfe-two  (:4003)        │
│  Controls            │  Counter                 │
│  [reload HEADER]     │                          │
│  [reload TWO]        │                          │
│  [reload THREE]      │                          │
│  [reload FOUR]       │                          │
├──────────────────────┼──────────────────────────┤
│  mfe-three (:4004)   │  mfe-four (:4005)        │
│  Timer               │  Selector                │
└──────────────────────┴──────────────────────────┘
Shell: http://localhost:4000
```

## Ports

| App        | Port |
|------------|------|
| shell      | 4000 |
| mfe-header | 4001 |
| mfe-one    | 4002 |
| mfe-two    | 4003 |
| mfe-three  | 4004 |
| mfe-four   | 4005 |

## Sentry setup

1. Copy `.env.example` to `.env` in `apps/shell/`
2. Paste your Sentry DSN as `VITE_SENTRY_DSN`

```bash
cp apps/shell/.env.example apps/shell/.env
# edit apps/shell/.env
```

## Running

The remotes must be **built** before the shell can load them via Module Federation.
`start.sh` handles this automatically:

```bash
pnpm dev          # build remotes → preview remotes → start shell dev server
```

Or manually:

```bash
# 1. Build all remotes
pnpm build:remotes

# 2. Start remote preview servers + shell dev server (in separate terminals or via concurrently)
pnpm start:remotes   # runs all 5 remotes on their ports
pnpm start:shell     # runs shell at :4000
```

## Nx commands

```bash
# Build everything
pnpm build

# Build only remotes
pnpm build:remotes

# Run a specific app
./node_modules/.bin/nx run mfe-two:serve
./node_modules/.bin/nx run shell:serve

# See the project graph
./node_modules/.bin/nx graph
```

## Architecture

- **Module Federation** via `@originjs/vite-plugin-federation` — each remote exposes `./App`
- **Shell** manages MFE keys (`useState`) — bumping a key remounts (re-fetches) the remote
- **Sentry** initialized in `apps/shell/src/main.tsx`:
  - `reactRouterV6BrowserTracingIntegration` — traces navigation
  - `replayIntegration` — session replay
  - `Sentry.withProfiler(App)` — component profiling
  - `Sentry.ErrorBoundary` — wraps each remote, reports errors
  - `Sentry.addBreadcrumb` — fires on every MFE refresh action
