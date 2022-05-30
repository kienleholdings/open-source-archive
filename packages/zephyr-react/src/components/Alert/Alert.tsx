import { useMemo } from 'react';
import type { ReactNode } from 'react';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

export interface AlertProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    body?: ClassName;
    closeButton?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * Will display an "x" icon inside of the alert and call the passed function when the button is clicked
   */
  onClose?: () => void;
  /**
   * Sets the type of alert to display. This will change the background and text colors
   */
  type: 'negative' | 'positive' | 'primary' | 'warning';
}

/**
 * Provides highly-visible feedback. This is best used after a user completes a complex action, such as submitting a form
 */
function Alert({ children, classNames, onClose, type }: AlertProps) {
  const computedClassNames = useMemo(
    () => ({
      body: computeClassName(
        [
          'flex-grow',
          {
            'text-white': ['negative', 'positive'].includes(type),
            'text-primary-type': type === 'primary',
            'text-black': type === 'warning',
          },
        ],
        classNames?.body
      ),
      closeButton: computeClassName(
        [
          focus,
          'w-16',
          {
            'text-white': ['negative', 'positive'].includes(type),
            'text-primary-type': type === 'primary',
            'text-black': type === 'warning',
          },
        ],
        classNames?.closeButton
      ),
      wrapper: computeClassName(
        [
          {
            'bg-negative': type === 'negative',
            'bg-positive': type === 'positive',
            'bg-primary': type === 'primary',
            'bg-warning': type === 'warning',
          },
          'flex',
          'py-16',
          'px-24',
          'rounded',
          'shadow-level-2',
        ],
        classNames?.wrapper
      ),
    }),
    [classNames, type]
  );

  return (
    <div className={computedClassNames.wrapper} role="alert">
      <Typography classNames={{ wrapper: computedClassNames.body }} type="body" variant="div">
        {children}
      </Typography>
      {onClose && (
        <button
          aria-label="Close Alert"
          className={computedClassNames.closeButton}
          onClick={onClose}
          type="button"
        >
          <Icon icon="times" />
        </button>
      )}
    </div>
  );
}

export default Alert;
