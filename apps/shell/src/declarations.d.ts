declare module 'mfe_header/App' {
  import { ComponentType } from 'react';
  interface HeaderAppProps {
    onRefreshAll?: () => void;
  }
  const App: ComponentType<HeaderAppProps>;
  export default App;
}

declare module 'mfe_one/App' {
  import { ComponentType } from 'react';
  interface MfeOneProps {
    onRefresh?: (name: string) => void;
  }
  const App: ComponentType<MfeOneProps>;
  export default App;
}

declare module 'mfe_two/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, never>>;
  export default App;
}

declare module 'mfe_three/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, never>>;
  export default App;
}

declare module 'mfe_four/App' {
  import { ComponentType } from 'react';
  const App: ComponentType<Record<string, never>>;
  export default App;
}
