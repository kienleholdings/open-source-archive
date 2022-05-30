import { InputGroup, RadioButton, Typography } from '@kienleholdings/zephyr-react';
import type {
  DisplayValueObject,
  InputGroupProps,
  RadioButtonProps,
} from '@kienleholdings/zephyr-react';
import classnames from 'classnames';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

// This one of two components where we can't use its zephyr-react props directly, thus some copy / paste action is happening
export interface RadioGroupProps {
  /**
   * Will add or override tailwind classes
   */
  classNames?: InputGroupProps['classNames'];
  /**
   * The items to display in the radio group
   */
  items: DisplayValueObject[];
  /**
   * The text to show the user above the input
   */
  label: string;
  /**
   * A unique, internal name for the input to be used for matching the label with the input and form submission
   */
  name: string;
  /**
   * Will add or override tailwind classes in the self-contained radio buttons
   */
  radioButtonClassNames?: RadioButtonProps['classNames'];
}

export function RadioGroup({
  classNames,
  items,
  label,
  name,
  radioButtonClassNames,
}: RadioGroupProps) {
  return (
    <InputGroup classNames={classNames} label={label}>
      {items.map((item, key) => (
        <Field name={name} type="radio" value={item.value}>
          {(fieldProps: FieldProps) => {
            const hasError = fieldProps.meta.touched && fieldProps.meta.error;
            return (
              <>
                <RadioButton
                  additionalInputProps={{
                    ...fieldProps.field,
                    'aria-describedby': hasError ? `radio-${name}-error` : undefined,
                    'aria-invalid': hasError ? 'true' : 'false',
                  }}
                  classNames={radioButtonClassNames}
                  id={item.value}
                  isLastInGroup={key === items.length - 1}
                  key={item.value}
                  label={item.display}
                  name={name}
                  value={item.value}
                />
                {hasError && (
                  <div
                    aria-live="assertive"
                    className={classnames({
                      '-mt-8': key === items.length - 1,
                      'mb-16': key === items.length - 1,
                      'mb-8': key !== items.length - 1,
                    })}
                    id={`radio-${name}-error`}
                  >
                    <Typography
                      classNames={{ wrapper: 'text-negative' }}
                      type="body"
                      variant="span"
                    >
                      {fieldProps.meta.error}
                    </Typography>
                  </div>
                )}
              </>
            );
          }}
        </Field>
      ))}
    </InputGroup>
  );
}

export default RadioGroup;
