import { useMemo } from 'react';
import type { HTMLProps, ReactNode } from 'react';

import type { Customization } from 'types';
import { customizeTopLevel } from 'utils/commonClassNames';

import RowContext from './RowContext';

export interface RowProps extends Omit<HTMLProps<HTMLDivElement>, 'wrap'> {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    el?: Customization;
  };
  /**
   * Puts an 8pt margin on each edge of the column
   */
  gutter?: boolean;
  /**
   * Allow columns to wrap if they don't have enough space
   */
  wrap?: boolean;
}

export const buildRowStyles = ({
  className,
  custom,
  gutter = true,
  wrap = false,
}: {
  className?: string;
  custom?: RowProps['custom'];
  gutter?: boolean;
  wrap?: boolean;
}) => ({
  el: customizeTopLevel(
    [
      {
        '-m-8': gutter,
        'flex-wrap': wrap,
      },
      'flex',
    ],
    className,
    custom?.el
  ),
});

/**
 * A flex grid designed to contain columns
 */
export function Row({
  children,
  className,
  custom,
  gutter = true,
  wrap = false,
  ...props
}: RowProps) {
  const styles = useMemo(
    () => buildRowStyles({ className, custom, gutter, wrap }),
    [className, custom, gutter, wrap]
  );

  const context = useMemo(() => ({ gutter }), [gutter]);

  return (
    <RowContext.Provider value={context}>
      <div {...props} className={styles.el}>
        {children}
      </div>
    </RowContext.Provider>
  );
}

export default Row;
