import { useMemo } from 'react';
import type { ReactElement } from 'react';

import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

export interface BadgeProps {
  children?: ReactElement;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    body?: ClassName;
  };
  /**
   * Sets the type of badge to display. This will change the background and text colors
   */
  type: 'negative' | 'positive' | 'primary' | 'warning';
}

/**
 * Highlights important data points for a user. This is especially useful in a card or table that contains lots of data
 */
export function Badge({ children, classNames, type }: BadgeProps) {
  const computedClassNames = useMemo(
    () => ({
      body: computeClassName(
        [
          {
            'bg-negative': type === 'negative',
            'bg-positive': type === 'positive',
            'bg-primary': type === 'primary',
            'bg-warning': type === 'warning',
            'text-white': ['negative', 'positive'].includes(type),
            'text-primary-type': type === 'primary',
            'text-black': type === 'warning',
          },
          'inline-block',
          'px-8',
          'rounded',
        ],
        classNames?.body
      ),
    }),
    [classNames, type]
  );

  return (
    <Typography classNames={{ wrapper: computedClassNames.body }} type="body" variant="div">
      {children}
    </Typography>
  );
}

export default Badge;
