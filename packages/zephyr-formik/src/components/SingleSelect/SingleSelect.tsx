import { SingleSelect as ZephyrSingleSelect, Typography } from '@kienleholdings/zephyr-react';
import type {
  DisplayValueObject,
  SingleSelectProps as ZephyrSingleSelectProps,
} from '@kienleholdings/zephyr-react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

// This one of two components where we can't use its zephyr-react props directly, thus some copy / paste action is happening
export interface SingleSelectProps {
  /**
   * Will add or override tailwind classes
   */
  classNames?: ZephyrSingleSelectProps['classNames'];
  /**
   * The selectable items that populate the dropdown's list
   */
  items: DisplayValueObject[];
  /**
   * The text to show the user above the dropdown button
   */
  label: string;
  /**
   * An internal-only name used for accessibility
   */
  name: string;
}

export function SingleSelect({ classNames, items, label, name }: SingleSelectProps) {
  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        const hasError = fieldProps.meta.touched && fieldProps.meta.error;
        return (
          <>
            {ZephyrSingleSelect}
            <ZephyrSingleSelect
              classNames={classNames}
              items={items}
              label={label}
              name={name}
              onChange={(value) => fieldProps.form.setFieldValue(name, value)}
              value={fieldProps.field.value}
            />
            {hasError && (
              <div aria-live="assertive" className="-mt-8 mb-16" id={`select-${name}-error`}>
                <Typography classNames={{ wrapper: 'text-negative' }} type="body" variant="span">
                  {fieldProps.meta.error}
                </Typography>
              </div>
            )}
          </>
        );
      }}
    </Field>
  );
}

export default SingleSelect;
