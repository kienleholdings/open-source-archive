// Clerk's typings are broken for React 18, so we have to temporarily wrap things for TypeChecks
// to pass, thus defeating the point of TS. Fingers crossed this gets fixed soon - 04/25/2022

import { ClerkProvider } from '@clerk/clerk-react';
import type { ClerkProviderProps } from '@clerk/clerk-react';
import type { ComponentType, ReactNode } from 'react';

interface ClerkProviderWithProps extends ClerkProviderProps {
  children: ReactNode;
}

export const ClerkProviderWrapper = ClerkProvider as ComponentType<ClerkProviderWithProps>;
