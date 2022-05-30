import { useMemo } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName, focus, hoverAnimation } from 'utils/commonClassNames';

export interface ButtonProps {
  /**
   * Make the button full-width
   */
  block?: boolean;
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    button?: ClassName;
  };
  /**
   * A hyperlink to navigate to
   */
  href?: string;
  /**
   * The html "type" property of the button
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /**
   * Prevents the button's onClick action from firing and shows a loading indicator
   */
  loading?: boolean;
  /**
   * This function will call when the button is clicked
   */
  onClick?: () => void;
  /**
   * Sets the type of button to display. This will change the background and text colors
   */
  type: 'negative' | 'positive' | 'primary' | 'warning' | 'secondary';
}

export const buildBaseButtonStyles = (
  block: ButtonProps['block'],
  loading: ButtonProps['loading'],
  type: ButtonProps['type']
) => [
  focus,
  hoverAnimation,
  {
    'text-white': ['negative', 'positive'].includes(type),
    'text-primary-type': type === 'primary',
    'text-secondary-type': type === 'secondary',
    'text-black': type === 'warning',
    block,
    'inline-block': !block,
    'w-full': block,
    'bg-primary': type === 'primary' && !loading,
    'bg-primary-light': type === 'primary' && loading,
    'hover:bg-primary-light': type === 'primary' && !loading,
    'active:bg-primary-dark': type === 'primary' && !loading,
    'bg-secondary': type === 'secondary',
    'bg-secondary-light': type === 'secondary' && loading,
    'hover:bg-secondary-light': type === 'secondary' && !loading,
    'active:bg-secondary-dark': type === 'secondary' && !loading,
    'bg-positive': type === 'positive',
    'bg-positive-light': type === 'positive' && loading,
    'hover:bg-positive-light': type === 'positive' && !loading,
    'active:bg-positive-dark': type === 'positive' && !loading,
    'bg-warning': type === 'warning',
    'bg-warning-light': type === 'warning' && loading,
    'hover:bg-warning-light': type === 'warning' && !loading,
    'active:bg-warning-dark': type === 'warning' && !loading,
    'bg-negative': type === 'negative',
    'bg-negative-light': type === 'negative' && loading,
    'hover:bg-negative-light': type === 'negative' && !loading,
    'active:bg-negative-dark': type === 'negative' && !loading,
    'shadow-level-2': !loading,
    'hover:shadow-level-3': !loading,
    'active:shadow-level-0': !loading,
    'cursor-wait': loading,
    'outline-0': loading, // Is this accessible?
  },
  'hover:translate-y-px',
  'px-16',
  'py-8',
  'rounded',
  'text-center',
];

/**
 * Allows the user to trigger an event on click
 */
export function Button({
  block,
  children,
  classNames,
  href,
  htmlType,
  loading = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  type,
}: ButtonProps) {
  const computedClassNames = useMemo(
    () => ({
      button: computeClassName(buildBaseButtonStyles(block, loading, type), classNames?.button),
    }),
    [block, classNames, loading, type]
  );

  if (href) {
    return (
      <a className={computedClassNames.button} href={href}>
        <Typography classNames={{ wrapper: 'text-' }} type="body-bold" variant="span">
          {children}
        </Typography>
      </a>
    );
  }

  return (
    <button
      aria-busy={loading}
      className={computedClassNames.button}
      disabled={loading}
      onClick={loading ? undefined : onClick}
      // Disabling that eslint rule as default props ensure that the button has a valid type
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
    >
      <Typography classNames={{ wrapper: 'text-' }} type="body-bold" variant="span">
        {children}
      </Typography>
      {loading && <Icon aria-label="Loading" className="ml-8 animate-spin" icon="spinner" />}
    </button>
  );
}

export default Button;
