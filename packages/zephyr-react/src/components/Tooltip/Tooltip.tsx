import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import Icon from 'components/Icon';
import type { ClassName } from 'types';
import { bodyFont, computeClassName } from 'utils/commonClassNames';

export interface TooltipProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    tooltip?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * An internal-only id used for accessibility
   */
  id: string;
  /**
   * Where should the tooltip go in relation to the element
   */
  position: 'bottom' | 'left' | 'right' | 'top';
  /**
   * Text shown inside the tooltip
   */
  text: string;
}

/**
 * Provided additional context to potentially unclear actions on hover
 */
export function Tooltip({ children, classNames, id, position, text }: TooltipProps) {
  const childrenContainerElement = useRef<HTMLDivElement>(null);

  const [childrenHeight, setChildrenHeight] = useState(0);
  const [childrenWidth, setChildrenWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const updateChildrenDimensions = () => {
      setChildrenHeight(childrenContainerElement.current?.clientHeight ?? 0);
      setChildrenWidth(childrenContainerElement.current?.clientWidth ?? 0);
    };

    updateChildrenDimensions();

    window.addEventListener('resize', updateChildrenDimensions);
    return () => window.removeEventListener('resize', updateChildrenDimensions);
  }, []);

  const computedClassNames = useMemo(
    () => ({
      tooltip: computeClassName(
        [
          bodyFont,
          'bg-black',
          'dark:bg-white',
          'px-8',
          'rounded',
          'shadow-level-1',
          'text-white',
          'dark:text-black',
          'w-auto',
        ],
        classNames?.tooltip
      ),
      wrapper: computeClassName(
        [
          {
            invisible: !visible,
            'flex-col': ['bottom', 'top'].includes(position),
            'justify-end': ['left'].includes(position),
          },
          'absolute',
          'flex',
          'items-center',
          'text-center',
          'w-full',
          'z-20',
        ],
        classNames?.wrapper
      ),
    }),
    [classNames, position, visible]
  );

  const computedStyle = useMemo(() => {
    switch (position) {
      case 'bottom':
        return { top: `${childrenHeight - 16}px` };
      case 'left':
        return { height: `${childrenHeight}px`, right: `${childrenWidth + 8}px` };
      case 'right':
        return { height: `${childrenHeight}px`, left: `${childrenWidth + 8}px` };
      case 'top':
        return { bottom: `${childrenHeight - 16}px` };
      default:
        return {};
    }
  }, [childrenHeight, childrenWidth, position]);

  return (
    <span
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className={computedClassNames.wrapper} style={computedStyle}>
        {position === 'bottom' && (
          <span
            className="block text-black dark:text-white text-heading-sm"
            style={{ marginBottom: '-16px' }}
          >
            <Icon icon="caret-up" />
          </span>
        )}
        {position === 'right' && (
          <span
            className="block text-black dark:text-white text-heading-sm"
            style={{ marginRight: '-2px' }}
          >
            <Icon icon="caret-left" />
          </span>
        )}
        <div id={`tooltip-${id}`} className={computedClassNames.tooltip} role="tooltip">
          {text}
        </div>
        {position === 'left' && (
          <span
            className="block text-black dark:text-white text-heading-sm"
            style={{ marginLeft: '-2px' }}
          >
            <Icon icon="caret-right" />
          </span>
        )}
        {position === 'top' && (
          <span
            className="block text-black dark:text-white text-heading-sm"
            style={{ marginTop: '-18px' }}
          >
            <Icon icon="caret-down" />
          </span>
        )}
      </div>
      <div
        // TODO: Does this work? Should this be moved to the child component itself?
        // If so, how do we enforce that for a11y
        aria-describedby={`tooltip-${id}`}
        className="inline-block"
        ref={childrenContainerElement}
      >
        {children}
      </div>
    </span>
  );
}

export default Tooltip;
