import { useMemo } from 'react';
import type { ReactNode } from 'react';

import type { ClassName } from 'types';
import { bodyFont, computeClassName, focus } from 'utils/commonClassNames';

export interface LinkProps {
  children: ReactNode;
  classNames?: {
    wrapper?: ClassName;
  };
  href: string;
}

export const linkStyles = [
  bodyFont,
  focus,
  'text-primary',
  'hover:text-primary-light',
  'active:text-primary-dark',
];

function Link({ children, classNames, href }: LinkProps) {
  const computedClassNames = useMemo(
    () => ({
      wrapper: computeClassName(linkStyles, classNames?.wrapper),
    }),
    [classNames]
  );
  return (
    <a className={computedClassNames.wrapper} href={href}>
      {children}
    </a>
  );
}

export default Link;
