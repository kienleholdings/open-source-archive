import type { GlobalState } from '@ladle/react/lib/shared/types';
import type { ReactNode } from 'react';

import '@kienleholdings/zephyr-core/zephyr-core.css';

interface ProviderProps {
  children: ReactNode;
  globalState: GlobalState;
}

// This has to be an arrow func otherwise it won't work. Why? No idea
export const Provider = ({ children }: ProviderProps) => {
  return { children };
};

export default Provider;
