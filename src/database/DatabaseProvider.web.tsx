import type { ReactNode } from 'react';

// The web preview keeps its existing behavior, without importing native SQLite setup.
export function DatabaseProvider({ children }: { children: ReactNode }) {
  return children;
}
