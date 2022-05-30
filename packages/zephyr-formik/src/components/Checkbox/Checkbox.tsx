import { Checkbox as ZephyrCheckbox, Typography } from '@kienleholdings/zephyr-react';
import type { CheckboxProps } from '@kienleholdings/zephyr-react';
import classnames from 'classnames';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

export function Checkbox({ classNames, label, name, isLastInGroup }: CheckboxProps) {
  return (
    <Field name={name} type="checkbox">
      {(fieldProps: FieldProps) => {
        const hasError = fieldProps.meta.touched && fieldProps.meta.error;
        return (
          <>
            <ZephyrCheckbox
              additionalInputProps={{
                ...fieldProps.field,
                'aria-describedby': hasError ? `checkbox-${name}-error` : undefined,
                'aria-invalid': hasError ? 'true' : 'false',
              }}
              classNames={classNames}
              isLastInGroup={isLastInGroup}
              label={label}
              name={name}
            />
            {hasError && (
              <div
                aria-live="assertive"
                className={classnames({
                  '-mt-8': isLastInGroup,
                  'mb-16': isLastInGroup,
                  'mb-8': !isLastInGroup,
                })}
                id={`input-${name}-error`}
              >
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

export default Checkbox;
