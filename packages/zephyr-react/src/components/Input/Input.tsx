import { useEffect, useMemo } from 'react';
import type { HTMLProps, InputHTMLAttributes } from 'react';

import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { bodyFont, computeClassName, focus } from 'utils/commonClassNames';

export interface InputProps {
  /**
   * Additional override props for the component, usually used by zephyr-formik. Use with extreme caution
   */
  additionalInputProps?: HTMLProps<HTMLInputElement>;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    input?: ClassName;
    label?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * The html "type" property of the input
   */
  htmlType?: Omit<
    InputHTMLAttributes<HTMLInputElement>['type'],
    | 'button'
    | 'checkbox'
    | 'color'
    | 'file'
    | 'hidden'
    | 'image'
    | 'radio'
    | 'range'
    | 'reset'
    | 'submit'
  >;
  /**
   * The text to show the user above the input
   */
  label: string;
  /**
   * A unique, internal name for the input to be used for matching the label with the input and form submission
   */
  name: string;
  /**
   * Text to give the user examples of valid input
   */
  placeholder?: string;
  /**
   * A callback function, usually to control state in a form
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  /**
   * The input's current value, usually provided by a form
   */
  value?: string;
}

/**
 * A text input
 */
export function Input({
  additionalInputProps,
  classNames,
  htmlType,
  label,
  name,
  onChange,
  placeholder,
  value,
}: InputProps) {
  useEffect(() => {
    if ((!onChange && value) || (onChange && !value)) {
      // eslint-disable-next-line no-console
      console.error(
        `zephyr-react: When you pass in a value or onChange callback, you must pass in both params, not just one. onChange: ${onChange}, value: ${value}`
      );
    }
  }, [onChange, value]);

  const computedClassNames = useMemo(
    () => ({
      input: computeClassName(
        [
          bodyFont,
          focus,
          'block',
          'bg-white',
          'dark:bg-black',
          'border',
          'border-bg-light',
          'dark:border-bg-dark',
          'px-16',
          'py-8',
          'rounded',
          'shadow-level-2',
          'text-black',
          'dark:text-white',
          'w-full',
        ],
        classNames?.input
      ),
      label: computeClassName(['block', 'mb-8', 'mr-8', 'w-full'], classNames?.label),
      wrapper: computeClassName(['block', 'mb-16', 'text-black'], classNames?.wrapper),
    }),
    [classNames]
  );

  return (
    <div className={computedClassNames.wrapper}>
      <label className="flex flex-wrap" htmlFor={`input-${name}`}>
        <Typography
          classNames={{ wrapper: computedClassNames.label }}
          type="body-bold"
          variant="span"
        >
          {label}
        </Typography>
        <input
          className={computedClassNames.input}
          id={`input-${name}`}
          name={name}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          type={htmlType as string}
          value={value}
          // Prop spreading is required for using a 3rd party form management library such as formik so we're disabling it here. Use with caution
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...additionalInputProps}
        />
      </label>
    </div>
  );
}

export default Input;
