import type { GlobalState } from '@ladle/react/lib/shared/types';
import type { ReactNode } from 'react';

import '@kienleholdings/zephyr-core/zephyr-core.css';

interface ProviderProps {
  children: ReactNode;
  globalState: GlobalState;
}

function Provider({ children }: ProviderProps) {
  return children;
}

export default Provider;
