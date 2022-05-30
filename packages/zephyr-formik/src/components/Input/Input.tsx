import { Input as ZephyrInput, Typography } from '@kienleholdings/zephyr-react';
import type { InputProps } from '@kienleholdings/zephyr-react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

export function Input({ classNames, htmlType, label, name, placeholder }: InputProps) {
  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        const hasError = fieldProps.meta.touched && fieldProps.meta.error;
        return (
          <>
            <ZephyrInput
              additionalInputProps={{
                ...fieldProps.field,
                'aria-describedby': hasError ? `input-${name}-error` : undefined,
                'aria-invalid': hasError ? 'true' : 'false',
              }}
              classNames={classNames}
              htmlType={htmlType}
              label={label}
              name={name}
              placeholder={placeholder}
            />
            {hasError && (
              <div aria-live="assertive" className="-mt-8 mb-16" id={`input-${name}-error`}>
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

export default Input;
