import { useMemo } from 'react';
import type { HTMLProps, ReactNode } from 'react';

import { buildTypeStyles } from 'components/Typography';
import type { Customization } from 'types';
import { customize, customizeTopLevel } from 'utils/commonClassNames';

export interface CardProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    body?: Customization;
    el?: Customization;
    header?: Customization;
  };
  /**
   * Contents of the upper-portion of the card, usually a string
   */
  header?: ReactNode | string;
  /**
   * Contents that are placed after the header, but before the body, usually an image
   */
  preBody?: ReactNode;
}

export const buildCardStyles = ({
  className,
  custom,
}: {
  className?: string;
  custom?: CardProps['custom'];
}) => ({
  body: customize('p-16', custom?.body),
  el: customizeTopLevel(
    'block bg-raised-light dark:bg-raised-dark rounded shadow-level-3 text-type-light dark:text-type-dark',
    className,
    custom?.el
  ),
  header: customize(
    [
      'border-b border-raised-border-light dark:border-raised-border-dark p-16',
      buildTypeStyles({ type: 'h6' }),
    ],
    custom?.header
  ),
});

/**
 * A rectangular container with an optional header, and styled body
 */
export function Card({ children, className, custom, header, preBody }: CardProps) {
  const styles = useMemo(() => buildCardStyles({ className, custom }), [className, custom]);

  return (
    <div className={styles.el}>
      {header && <div className={styles.header}>{header}</div>}
      {preBody}
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default Card;
