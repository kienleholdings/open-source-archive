import { useMemo } from 'react';
import type { ReactNode } from 'react';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

export interface ModalProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    body?: ClassName;
    closeButton?: ClassName;
    container?: ClassName;
    header?: ClassName;
    modal?: ClassName;
    title?: ClassName;
  };
  /**
   * Add a semi-transparent black background behind the modal
   */
  darkenBackground?: boolean;
  /**
   * A unique ID for the modal used for accessibility
   */
  id: string;
  /**
   * A callback function used to control the modal's visibility. Used when the close button is clicked
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  setVisible: (value: boolean) => void;
  /**
   * The text to display at the top of the modal
   */
  title: string;
  /**
   * A boolean determining if the modal is shown or not
   */
  visible: boolean;
  /**
   * A custom width for the modal to be used if the default does not satisfy the contents
   */
  width?: string;
}

/**
 * A popup generally used for confirming destructive or complex actions
 */
export function Modal({
  children,
  classNames,
  darkenBackground = true,
  id,
  setVisible,
  title,
  visible,
  width = '512px',
}: ModalProps) {
  const backgroundStyles = useMemo(
    () => (darkenBackground ? { background: 'rgba(0, 0, 0, 0.3)' } : {}),
    [darkenBackground]
  );

  const computedClassNames = useMemo(
    () => ({
      body: computeClassName(['p-18'], classNames?.body),
      closeButton: computeClassName(
        [focus, 'text-black', 'dark:text-white'],
        classNames?.closeButton
      ),
      container: computeClassName(
        [
          'fixed',
          'flex',
          'h-screen',
          'items-center',
          'justify-center',
          'left-0',
          'top-0',
          'w-screen',
          'z-50',
        ],
        classNames?.container
      ),
      header: computeClassName(
        ['border-b', 'border-bg-light', 'dark:border-bg-dark', 'flex', 'items-center', 'p-16'],
        classNames?.header
      ),
      modal: computeClassName(
        ['bg-white', 'dark:bg-black', 'block', 'mb-8', 'rounded', 'shadow-level-5'],
        classNames?.modal
      ),
      title: computeClassName(['block', 'flex-grow'], classNames?.title),
    }),
    [classNames]
  );

  if (!visible) {
    return null;
  }

  return (
    <div className={computedClassNames.container} style={backgroundStyles}>
      <div aria-modal="true" className={computedClassNames.modal} role="dialog" style={{ width }}>
        <div className={computedClassNames.header}>
          <Typography
            classNames={{ wrapper: computedClassNames.title }}
            type="body-bold"
            variant="span"
          >
            <span id={`modal-${id}-label`}>{title}</span>
          </Typography>
          <button
            aria-label="Close Modal"
            className={computedClassNames.closeButton}
            onClick={() => setVisible(false)}
            type="button"
          >
            <Icon icon="times" />
          </button>
        </div>
        <div className={computedClassNames.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
