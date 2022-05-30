import type { GlobalState } from '@ladle/react/lib/shared/types';
import type { ReactNode } from 'react';

import { ClerkProviderWrapper as ClerkProvider } from '../src/utils/clerkWrappers';

import '@kienleholdings/zephyr-core/zephyr-core.css';

const frontendApi = import.meta.env.VITE_CLERK_API_KEY;

interface ProviderProps {
  children: ReactNode;
  globalState: GlobalState;
}

// This has to be an arrow func otherwise it won't work. Why? No idea
export const Provider = ({ children }: ProviderProps) => {
  // Clerk's typings are broken for React 18, so we have to temporarily wrap things for TypeChecks
  // to pass, thus defeating the point of TS. Fingers crossed this gets fixed soon - 04/25/2022
  return <ClerkProvider frontendApi={frontendApi}>{children}</ClerkProvider>;
};

export default Provider;
