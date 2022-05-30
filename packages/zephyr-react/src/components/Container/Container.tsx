import { useMemo } from 'react';
import type { ReactNode } from 'react';

import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

export type ContainerSizes = 'fluid' | 'four-column' | 'three-column' | 'long-form';

export interface ContainerProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    container?: ClassName;
  };
  /**
   * Sets the type of alert to display. This will change the background and text colors
   */
  size?: ContainerSizes;
}

export function Container({ children, classNames, size = 'four-column' }: ContainerProps) {
  const computedClassNames = useMemo(
    () => ({
      container: computeClassName(
        [
          {
            'max-w-container-four-column': size === 'four-column',
            'max-w-container-long-form': size === 'long-form',
            'max-w-container-three-column': size === 'three-column',
            'mx-auto': size !== 'fluid',
          },
          'px-16',
          'md:px-32',
        ],
        classNames?.container
      ),
    }),
    [classNames, size]
  );

  return <div className={computedClassNames.container}>{children}</div>;
}

export default Container;
