import React, { lazy, Suspense, useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';

// HOC: creates a child span for each MFE that lives as long as the component
// is mounted. The span carries `mfe.name` as an attribute, making it visible
// as a labelled span in Sentry's trace view (not just on the root transaction).
function withMfeTag<P extends object>(
  Component: React.ComponentType<P>,
  mfeName: string,
): React.FC<P> {
  function MfeTagWrapper(props: P) {
    useEffect(() => {
      const span = Sentry.startInactiveSpan({
        name: mfeName,
        op: 'mfe.render',
        attributes: { 'mfe.name': mfeName },
      });
      return () => { span.end(); };
    }, []);
    return <Component {...props} />;
  }
  MfeTagWrapper.displayName = mfeName;
  return MfeTagWrapper;
}

// Remote MFEs loaded via Module Federation — each wrapped with:
//   1. withMfeTag  → stamps the active span with mfe.name for filtering
//   2. withProfiler → names the profiler span in Sentry
const MfeHeader = lazy(() =>
  import('mfe_header/App').then(m => ({
    default: Sentry.withProfiler(withMfeTag(m.default, 'mfe-header'), { name: 'mfe-header' }),
  }))
);
const MfeOne = lazy(() =>
  import('mfe_one/App').then(m => ({
    default: Sentry.withProfiler(withMfeTag(m.default, 'mfe-one'), { name: 'mfe-one' }),
  }))
);
const MfeTwo = lazy(() =>
  import('mfe_two/App').then(m => ({
    default: Sentry.withProfiler(withMfeTag(m.default, 'mfe-two'), { name: 'mfe-two' }),
  }))
);
const MfeThree = lazy(() =>
  import('mfe_three/App').then(m => ({
    default: Sentry.withProfiler(withMfeTag(m.default, 'mfe-three'), { name: 'mfe-three' }),
  }))
);
const MfeFour = lazy(() =>
  import('mfe_four/App').then(m => ({
    default: Sentry.withProfiler(withMfeTag(m.default, 'mfe-four'), { name: 'mfe-four' }),
  }))
);

type MfeKey = 'header' | 'one' | 'two' | 'three' | 'four';

function MfeFallback({ name }: { name: string }) {
  return (
    <div style={{ padding: '12px', color: '#6b7280', fontSize: '12px' }}>
      Loading {name}...
    </div>
  );
}

function MfeError({ name }: { name: string }) {
  return (
    <div style={{ padding: '12px', color: '#f87171', fontSize: '12px', border: '1px dashed #f87171' }}>
      Failed to load {name}. Is the remote running?
    </div>
  );
}

const boxStyle = (color: string): React.CSSProperties => ({
  border: `2px solid ${color}`,
  padding: '16px',
  position: 'relative',
  minHeight: '120px',
});

const labelStyle = (color: string): React.CSSProperties => ({
  position: 'absolute',
  top: '4px',
  right: '6px',
  fontSize: '9px',
  color: color,
  opacity: 0.5,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
});

function App() {
  const [keys, setKeys] = useState<Record<MfeKey, number>>({
    header: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  });

  const refresh = (name: string) => {
    const key = name as MfeKey;
    setKeys(prev => ({ ...prev, [key]: prev[key] + 1 }));
    Sentry.addBreadcrumb({ category: 'mfe.refresh', message: `Refreshed MFE: ${name}`, level: 'info' });
  };

  const refreshAll = () => {
    setKeys(prev => ({
      header: prev.header + 1,
      one: prev.one + 1,
      two: prev.two + 1,
      three: prev.three + 1,
      four: prev.four + 1,
    }));
    Sentry.addBreadcrumb({ category: 'mfe.refresh', message: 'Refreshed all MFEs', level: 'info' });
  };

  return (
    <div style={{ padding: '8px', minHeight: '100vh' }}>

      {/* TOP: Header MFE — full width */}
      <div style={{ ...boxStyle('#4ade80'), marginBottom: '8px' }}>
        <span style={labelStyle('#4ade80')}>mfe-header · :4001</span>
        <Sentry.ErrorBoundary fallback={<MfeError name="mfe-header" />}>
          <Suspense fallback={<MfeFallback name="mfe-header" />}>
            <MfeHeader key={keys.header} onRefreshAll={refreshAll} />
          </Suspense>
        </Sentry.ErrorBoundary>
      </div>

      {/* BOTTOM: 2×2 grid of 4 MFEs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>

        {/* MFE ONE — controls panel */}
        <div style={boxStyle('#60a5fa')}>
          <span style={labelStyle('#60a5fa')}>mfe-one · :4002</span>
          <Sentry.ErrorBoundary fallback={<MfeError name="mfe-one" />}>
            <Suspense fallback={<MfeFallback name="mfe-one" />}>
              <MfeOne key={keys.one} onRefresh={refresh} />
            </Suspense>
          </Sentry.ErrorBoundary>
        </div>

        {/* MFE TWO */}
        <div style={boxStyle('#f472b6')}>
          <span style={labelStyle('#f472b6')}>mfe-two · :4003</span>
          <Sentry.ErrorBoundary fallback={<MfeError name="mfe-two" />}>
            <Suspense fallback={<MfeFallback name="mfe-two" />}>
              <MfeTwo key={keys.two} />
            </Suspense>
          </Sentry.ErrorBoundary>
        </div>

        {/* MFE THREE */}
        <div style={boxStyle('#fb923c')}>
          <span style={labelStyle('#fb923c')}>mfe-three · :4004</span>
          <Sentry.ErrorBoundary fallback={<MfeError name="mfe-three" />}>
            <Suspense fallback={<MfeFallback name="mfe-three" />}>
              <MfeThree key={keys.three} />
            </Suspense>
          </Sentry.ErrorBoundary>
        </div>

        {/* MFE FOUR */}
        <div style={boxStyle('#a78bfa')}>
          <span style={labelStyle('#a78bfa')}>mfe-four · :4005</span>
          <Sentry.ErrorBoundary fallback={<MfeError name="mfe-four" />}>
            <Suspense fallback={<MfeFallback name="mfe-four" />}>
              <MfeFour key={keys.four} />
            </Suspense>
          </Sentry.ErrorBoundary>
        </div>

      </div>
    </div>
  );
}

export default Sentry.withProfiler(App, { name: 'shell' });
