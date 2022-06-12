import { useMemo } from 'react';
import type { HTMLProps, ReactNode } from 'react';

import type { Customization } from 'types';
import { customizeTopLevel } from 'utils/commonClassNames';

export type ContainerSizes = 'fluid' | 'four-column' | 'three-column' | 'long-form';

export interface ContainerProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    el?: Customization;
  };
  /**
   * Sets the type of alert to display. This will change the background and text colors
   */
  size?: ContainerSizes;
}

export const buildContainerStyles = ({
  className = '',
  custom,
  size = 'four-column',
}: {
  className?: string;
  custom?: ContainerProps['custom'];
  size?: ContainerProps['size'];
}) =>
  customizeTopLevel(
    [
      {
        'max-w-container-four-column': size === 'four-column',
        'max-w-container-long-form': size === 'long-form',
        'max-w-container-three-column': size === 'three-column',
        'mx-auto': size !== 'fluid',
      },
      'px-16',
      'md:px-32',
      'w-full',
    ],
    className,
    custom?.el
  );

export function Container({
  children,
  className,
  custom,
  size = 'four-column',
  ...props
}: ContainerProps) {
  const styles = useMemo(
    () => buildContainerStyles({ className, custom, size }),
    [className, custom, size]
  );

  return (
    <div {...props} className={styles}>
      {children}
    </div>
  );
}

export default Container;
