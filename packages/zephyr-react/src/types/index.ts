import type { Argument } from 'classnames';
import type { ReactNode } from 'react';

export type ClassName = string | { overrides: Argument[] };

export type DisplayValueObject = {
  display: string;
  value: string;
};

export interface MenuItemProps {
  children: ReactNode;
  className: string;
  href: string;
  setMenuClose?: () => void;
}
