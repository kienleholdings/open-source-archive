import { useMemo } from 'react';
import type { ReactNode } from 'react';

import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

import RowContext from './RowContext';

export interface RowProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    row?: ClassName;
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

/**
 * A flex grid designed to contain columns
 */
export function Row({ children, classNames, gutter = true, wrap = false }: RowProps) {
  const computedClassNames = useMemo(
    () => ({
      row: computeClassName(
        [
          {
            '-m-8': gutter,
            'flex-wrap': wrap,
          },
          'flex',
        ],
        classNames?.row
      ),
    }),
    [classNames, gutter, wrap]
  );

  const context = useMemo(() => ({ gutter }), [gutter]);

  return (
    <RowContext.Provider value={context}>
      <div className={computedClassNames.row}>{children}</div>
    </RowContext.Provider>
  );
}

export default Row;
