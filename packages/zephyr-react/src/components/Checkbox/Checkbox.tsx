import { useEffect, useMemo, useRef, useState } from 'react';
import type { HTMLProps } from 'react';
import Icon from 'components/Icon';
import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName, focusNoSelector } from 'utils/commonClassNames';

export interface CheckboxProps {
  /**
   * Additional override props for the component, usually used by zephyr-formik. Use with extreme caution
   */
  additionalInputProps?: HTMLProps<HTMLInputElement>;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    box?: ClassName;
    input?: ClassName;
    label?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * Adds an additional 8px of margin to the bottom of a checkbox for consistent form styles
   */
  isLastInGroup?: boolean;
  /**
   * The text to show the user next to the checkbox
   */
  label: string;
  /**
   * A unique, internal name for the checkbox to be used for matching the label with the input and form submission
   */
  name: string;
  /**
   * A callback function, usually to control state in a form
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  onClick?: (value: boolean) => void;
  /**
   * The checkbox's current value, usually provided by a form
   */
  value?: boolean;
}

/**
 * An input for making multiple selections between a small set of items
 */
export function Checkbox({
  additionalInputProps,
  classNames,
  isLastInGroup = false,
  label,
  name,
  onClick,
  value,
}: CheckboxProps) {
  const realValue = additionalInputProps?.value ?? value;
  useEffect(() => {
    if ((!onClick && typeof value === 'boolean') || (onClick && typeof value !== 'boolean')) {
      // eslint-disable-next-line no-console
      console.error(
        `zephyr-react: When you pass in a value or onClick callback, you must pass in both params, not just one. onClick: ${onClick}, value: ${value}`
      );
    }
  }, [onClick, value]);

  const checkboxElement = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(value || false);
  const [focused, setFocused] = useState(false);

  const computedClassNames = useMemo(
    () => ({
      box: computeClassName(
        [
          {
            [focusNoSelector]: focused,
            'bg-primary': checked,
            'border-2': !checked,
            'bg-white dark:bg-black': !checked,
          },
          'border-primary',
          'cursor-pointer',
          'flex',
          'h-24',
          'items-center',
          'justify-center',
          'rounded',
          'shadow-level-2',
          'hover:shadow-level-3',
          'text-primary-type',
          'w-24',
        ],
        classNames?.box
      ),
      input: computeClassName(
        ['absolute', 'h-24', 'opacity-0', 'left-checkbox', 'w-24'],
        classNames?.input
      ),
      label: computeClassName(['ml-8'], classNames?.label),
      wrapper: computeClassName(
        ['flex', 'text-black', { 'mb-8': !isLastInGroup, 'mb-16': isLastInGroup }],
        classNames?.wrapper
      ),
    }),
    [classNames, checked, focused, isLastInGroup]
  );

  useEffect(() => {
    if (typeof realValue === 'boolean') {
      setChecked(realValue);
    }
  }, [realValue]);

  const handleCheckboxClick = () => {
    const newValue = !checked;
    setChecked(newValue);

    if (onClick) {
      onClick(newValue);
    }
  };

  const handleFakeCheckboxClick = () => {
    checkboxElement.current?.click();
    checkboxElement.current?.focus();
  };

  return (
    <div className={computedClassNames.wrapper}>
      <div aria-hidden="true" className={computedClassNames.box} onClick={handleFakeCheckboxClick}>
        {checked && <Icon icon="check" />}
      </div>
      <label className="relative" htmlFor={`checkbox-${name}`}>
        <input
          id={`checkbox-${name}`}
          ref={checkboxElement}
          className={computedClassNames.input}
          onClick={handleCheckboxClick}
          onFocus={() => setFocused(true)}
          type="checkbox"
          value={value?.toString() ?? undefined}
          // Prop spreading is required for using a 3rd party form management library such as formik so we're disabling it here. Use with caution
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...additionalInputProps}
          // We had to prevent onBlur from being overrided completely otherwise focus looked weird
          onBlur={(e) => {
            setFocused(false);
            if (additionalInputProps?.onBlur) {
              additionalInputProps.onBlur(e);
            }
          }}
        />
        <Typography classNames={{ wrapper: computedClassNames.label }} type="body" variant="span">
          {label}
        </Typography>
      </label>
    </div>
  );
}

export default Checkbox;
