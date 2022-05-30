import { useMemo } from 'react';
import type { ReactNode } from 'react';

import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

export interface CardProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    body?: ClassName;
    footer?: ClassName;
    header?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * Contents of the lower-portion of the card, usually a `<Button />`
   */
  footer?: ReactNode;
  /**
   * Contents of the upper-portion of the card, usually a `<Text style="heading-xs" />`
   */
  header?: ReactNode;
  /**
   * Contents that are placed after the header, but before the body, usually a `<img />`
   */
  preBody?: ReactNode;
}

/**
 * A rectangular container with an optional header, footer, and styled body
 */
export function Card({ children, classNames, footer, header, preBody }: CardProps) {
  const computedClassNames = useMemo(
    () => ({
      body: computeClassName(['p-16'], classNames?.body),
      footer: computeClassName(
        ['border-t', 'border-bg-light', 'dark:border-bg-dark', 'p-16'],
        classNames?.footer
      ),
      header: computeClassName(
        ['border-b', 'border-bg-light', 'dark:border-bg-dark', 'p-16', 'mb-0'],
        classNames?.header
      ),
      wrapper: computeClassName(
        [
          'block',
          'bg-white',
          'dark:bg-black',
          'rounded',
          'shadow-level-3',
          'text-black',
          'dark:text-white',
        ],
        classNames?.wrapper
      ),
    }),
    [classNames]
  );

  return (
    <div className={computedClassNames.wrapper}>
      {header && (
        <Typography
          classNames={{ wrapper: computedClassNames.header }}
          type="heading-xs"
          variant="div"
        >
          {header}
        </Typography>
      )}
      {preBody}
      <div className={computedClassNames.body}>{children}</div>
      {footer && <div className={computedClassNames.footer}>{footer}</div>}
    </div>
  );
}

export default Card;
