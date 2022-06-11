import type { Argument } from 'classnames';
import type { ClassValue } from 'clsx';
import type { ReactNode } from 'react';

export type Customization = ClassValue | ClassValue[] | [...ClassValue[], boolean];
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
