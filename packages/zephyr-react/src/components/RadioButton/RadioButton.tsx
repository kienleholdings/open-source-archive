import { useMemo, useRef, useState } from 'react';
import type { HTMLProps } from 'react';

import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { bodyFont, computeClassName, focusNoSelector } from 'utils/commonClassNames';

export interface RadioButtonProps {
  /**
   * Additional override props for the component, usually used by zephyr-formik. Use with extreme caution
   */
  additionalInputProps?: HTMLProps<HTMLInputElement>;
  /**
   * A boolean showing if this specific radio button is selected or not, usually controlled from a form
   */
  checked?: boolean;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    activeButton?: ClassName;
    button?: ClassName;
    input?: ClassName;
    label?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * Adds an additional 8px of margin to the bottom of a radio button for consistent form styles
   */
  isLastInGroup?: boolean;
  /**
   * The text to show the user next to the radio button
   */
  label: string;
  /**
   * A unique, internal name for the radio button to be used for matching the label with the input
   */
  id: string;
  /**
   * A group-level, internal name for the radio button to be used for form submission
   */
  name: string;
  /**
   * A callback function, usually to control state in a form
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  /**
   * The value to be returned on selection
   */
  value: string;
}

/**
 * A single radio button, used in the RadioGroup component
 */
export function RadioButton({
  additionalInputProps,
  checked,
  classNames,
  isLastInGroup = false,
  label,
  name,
  onChange,
  value,
}: RadioButtonProps) {
  const realValue = additionalInputProps?.checked ?? checked;
  const radioElement = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const computedClassNames = useMemo(
    () => ({
      activeButton: computeClassName(['rounded-round bg-white w-8 h-8'], classNames?.activeButton),
      button: computeClassName(
        [
          {
            [focusNoSelector]: focused,
            'bg-primary': realValue,
            'border-2 bg-white dark:bg-black': !realValue,
          },
          'border-primary',
          'cursor-pointer',
          'flex',
          'h-24',
          'items-center',
          'justify-center',
          'rounded-round',
          'shadow-level-2',
          'hover:shadow-level-3',
          'text-primary-type',
          'w-24',
        ],
        classNames?.button
      ),
      input: computeClassName(
        ['absolute', 'h-24', 'opacity-0', 'left-checkbox', 'w-24'],
        classNames?.input
      ),
      label: computeClassName(['ml-8'], classNames?.label),
      wrapper: computeClassName(
        [bodyFont, 'flex', 'text-black', { 'mb-8': !isLastInGroup, 'mb-16': isLastInGroup }],
        classNames?.wrapper
      ),
    }),
    [classNames, focused, isLastInGroup, realValue]
  );

  const handleRadioClick = () => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleFakeCheckboxClick = () => {
    radioElement.current?.click();
    radioElement.current?.focus();
  };

  return (
    <div className={computedClassNames.wrapper}>
      <div
        aria-hidden="true"
        className={computedClassNames.button}
        onClick={handleFakeCheckboxClick}
      >
        {realValue && <div className={computedClassNames.activeButton} />}
      </div>
      <label className="relative" htmlFor={`radio-${name}-${value}`}>
        <input
          checked={realValue}
          className={computedClassNames.input}
          id={`radio-${name}-${value}`}
          name={name}
          onChange={handleRadioClick}
          onFocus={() => setFocused(true)}
          ref={radioElement}
          type="radio"
          value={value}
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

export default RadioButton;
