import { useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import { RowContext } from 'components/Row';
import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

type ColumnSizing = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface ColumnProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    column?: ClassName;
  };
  /**
   * Medium Breakpoint Size
   */
  md?: ColumnSizing;
  /**
   * Large Breakpoint Size
   */
  lg?: ColumnSizing;
  /**
   * Small Breakpoint Size
   */
  sm?: ColumnSizing;
  /**
   * Extra-Small Breakpoint Size
   */
  xs?: ColumnSizing;
}

/**
 * A container with responsive sizing options of 1/12 - 100% of the container
 */
export function Column({ children, classNames, xs, sm, md, lg }: ColumnProps) {
  const context = useContext(RowContext);
  const computedClassNames = useMemo(
    () => ({
      wrapper: computeClassName(
        [
          // I originally tried using string templates for these, but we have to write them all out
          // by hand because of Tailwind 3's new JIT mode, ugh
          {
            'p-8': context.gutter,
            'w-1/12': xs === '1',
            'w-2/12': xs === '2',
            'w-3/12': xs === '3',
            'w-4/12': xs === '4',
            'w-5/12': xs === '5',
            'w-6/12': xs === '6',
            'w-7/12': xs === '7',
            'w-8/12': xs === '8',
            'w-9/12': xs === '9',
            'w-10/12': xs === '10',
            'w-11/12': xs === '11',
            'w-full': xs === '12',
            'sm:w-1/12': sm === '1',
            'sm:w-2/12': sm === '2',
            'sm:w-3/12': sm === '3',
            'sm:w-4/12': sm === '4',
            'sm:w-5/12': sm === '5',
            'sm:w-6/12': sm === '6',
            'sm:w-7/12': sm === '7',
            'sm:w-8/12': sm === '8',
            'sm:w-9/12': sm === '9',
            'sm:w-10/12': sm === '10',
            'sm:w-11/12': sm === '11',
            'sm:w-full': sm === '12',
            'md:w-1/12': md === '1',
            'md:w-2/12': md === '2',
            'md:w-3/12': md === '3',
            'md:w-4/12': md === '4',
            'md:w-5/12': md === '5',
            'md:w-6/12': md === '6',
            'md:w-7/12': md === '7',
            'md:w-8/12': md === '8',
            'md:w-9/12': md === '9',
            'md:w-10/12': md === '10',
            'md:w-11/12': md === '11',
            'md:w-full': md === '12',
            'lg:w-1/12': lg === '1',
            'lg:w-2/12': lg === '2',
            'lg:w-3/12': lg === '3',
            'lg:w-4/12': lg === '4',
            'lg:w-5/12': lg === '5',
            'lg:w-6/12': lg === '6',
            'lg:w-7/12': lg === '7',
            'lg:w-8/12': lg === '8',
            'lg:w-9/12': lg === '9',
            'lg:w-10/12': lg === '10',
            'lg:w-11/12': lg === '11',
            'lg:w-full': lg === '12',
          },
          'block',
        ],
        classNames?.column
      ),
    }),
    [classNames, context, xs, sm, md, lg]
  );

  return <div className={computedClassNames.wrapper}>{children}</div>;
}

export default Column;
