import { useMemo } from 'react';
import type { HTMLProps } from 'react';

import type { ClassName } from 'types';
import { bodyFont, customizeTopLevel, focus } from 'utils/commonClassNames';

export interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  custom?: {
    el?: ClassName;
  };
  /**
   * Removes any added font styles, ensures styles are inherited from parent element
   */
  inheritFont?: boolean;
  type?: 'button-primary' | 'button-secondary' | 'text';
}

export const linkStyles = [
  bodyFont,
  focus,
  'text-primary',
  'hover:text-primary-light',
  'active:text-primary-dark',
];

export const buildLinkStyles = ({
  className,
  custom,
  inheritFont = false,
  type = 'text',
}: {
  className?: string;
  custom?: LinkProps['custom'];
  inheritFont?: boolean;
  type?: LinkProps['type'];
}) => {
  console.log(type);
  return {
    el: customizeTopLevel(
      [bodyFont, focus, 'hover:text-primary-dark text-primary', { bodyFont: inheritFont }],
      className,
      custom?.el
    ),
  };
};

function Link({ children, className, custom, inheritFont, type = 'text', ...props }: LinkProps) {
  const styles = useMemo(
    () => buildLinkStyles({ className, custom, inheritFont, type }),
    [className, custom, inheritFont, type]
  );
  return (
    <a {...props} className={styles.el}>
      {children}
    </a>
  );
}

export default Link;
