import { useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

const DEFAULT_TOAST_OPEN_DURATION = 6000; // 6000 ms or 6 seconds

export interface ToastProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    closeButton?: ClassName;
    toast?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * A pixel value that determines how far from the top of the screen the toast is placed
   */
  offset?: string;
  /**
   * A callback function, called after the timeout or when the close button is pressed
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  setVisible: (value: boolean) => void;
  type: 'negative' | 'positive' | 'primary' | 'warning';
  /**
   * The visibility of the toast, should be controlled with a state hook in the parent
   */
  visible: boolean;
}

/**
 * A popup generally used for confirming destructive or complex actions
 */
export function Toast({
  children,
  classNames,
  offset = '0px',
  setVisible,
  type,
  visible,
}: ToastProps) {
  const computedClassNames = useMemo(
    () => ({
      closeButton: computeClassName([focus], classNames?.closeButton),
      toast: computeClassName(
        [
          {
            'text-white': ['negative', 'positive'].includes(type),
            'text-primary-type': type === 'primary',
            'text-black': type === 'warning',
          },
          [`bg-${type}`],
          'flex',
          'px-16',
          'py-8',
          'shadow-level-5',
          'w-full',
        ],
        classNames?.toast
      ),
      wrapper: computeClassName(['fixed', 'left-0', 'w-full', 'z-40'], classNames?.wrapper),
    }),
    [classNames, type]
  );

  useEffect(() => {
    if (visible) {
      const autoCloseTimer = setTimeout(() => {
        setVisible(false);
      }, DEFAULT_TOAST_OPEN_DURATION);

      return () => clearTimeout(autoCloseTimer);
    }
    return () => undefined;
  }, [setVisible, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={computedClassNames.wrapper} style={{ top: offset }}>
      <Typography classNames={{ wrapper: computedClassNames.toast }} type="body" variant="div">
        <span className="flex-grow">{children}</span>
        <button
          aria-label="Close Alert"
          className={computedClassNames.closeButton}
          onClick={() => setVisible(false)}
          type="button"
        >
          <Icon icon="times" />
        </button>
      </Typography>
    </div>
  );
}

export default Toast;
