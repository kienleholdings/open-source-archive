import { useMemo } from 'react';
import type { ReactNode } from 'react';

import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName } from 'utils/commonClassNames';

export interface InputGroupProps {
  /**
   * Optionally change the styles to be better suited for checkboxes and radio buttons rather than inputs
   */
  checkboxRadio?: boolean;
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    label?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * A name to display to the user
   */
  label: string;
}

export function InputGroup({
  checkboxRadio = false,
  children,
  classNames,
  label,
}: InputGroupProps) {
  const computedClassNames = useMemo(
    () => ({
      label: computeClassName(
        [
          'block',
          'font-bold',
          'w-full',
          {
            'mb-8': checkboxRadio,
            'mb-16': !checkboxRadio,
            'text-heading-sm': !checkboxRadio,
          },
        ],
        classNames?.label
      ),
      wrapper: computeClassName(
        ['block', 'text-black', { 'mb-16': !checkboxRadio, 'mb-8': checkboxRadio }],
        classNames?.wrapper
      ),
    }),
    [classNames, checkboxRadio]
  );

  return (
    <fieldset className={computedClassNames.wrapper}>
      <legend className={computedClassNames.label}>
        <Typography type="body-bold" variant="span">
          {label}
        </Typography>
      </legend>
      {children}
    </fieldset>
  );
}

export default InputGroup;
