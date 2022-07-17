import { useMemo } from 'react';
import type { HTMLProps } from 'react';

import { AlertCircle, AlertOctagon } from 'components/Icons';
import { P } from 'components/Typography';
import type { Customization } from 'types';
import { customize, customizeTopLevel } from 'utils/commonClassNames';

export interface AlertProps extends HTMLProps<HTMLDivElement> {
  /**
   * Sets the type of alert to display. This will change the background and text colors
   */
  color?: 'error' | 'primary';
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    el?: Customization;
    icon?: Customization;
    message?: Customization;
    title?: Customization;
  };
  /**
   * A large title displayed over the children of the error used to provide an easier to scan top-level error
   */
  title?: string;
}

export const buildAlertStyles = ({
  className,
  color,
  custom,
}: {
  className?: string;
  color?: AlertProps['color'];
  custom?: AlertProps['custom'];
}) => ({
  el: customizeTopLevel(
    [
      'flex mb-16 p-16 rounded shadow-level-1',
      {
        'bg-error': color === 'error',
        'bg-primary': color === 'primary',
        'text-error-type': color === 'error',
        'text-primary-type': color === 'primary',
      },
    ],
    className,
    custom?.el
  ),
  icon: customize('mr-8'),
  message: customize(
    {
      'text-error-type': color === 'error',
      'dark:text-error-type': color === 'error',
      'text-primary-type': color === 'primary',
      'dark:primary-type': color === 'primary',
    },
    custom?.message
  ),
  title: customize(
    ['mb-8', { 'text-error-type': color === 'error', 'text-primary-type': color === 'primary' }],
    custom?.title
  ),
});

/**
 * Provides highly-visible feedback. This is best used after a user completes a complex action, such as submitting a form
 */
function Alert({ children, className, color = 'primary', custom, title }: AlertProps) {
  const styles = useMemo(
    () => buildAlertStyles({ className, color, custom }),
    [className, color, custom]
  );

  return (
    <div className={styles.el} role="alert">
      {color === 'error' ? (
        <AlertOctagon className={styles.icon} />
      ) : (
        <AlertCircle className={styles.icon} />
      )}
      <div>
        {title?.length && (
          <P className={styles.title} noColor type="body-lg">
            {title}
          </P>
        )}
        <P className={styles.message} paragraphSpacing={false} noColor>
          {children}
        </P>
      </div>
    </div>
  );
}

export default Alert;
