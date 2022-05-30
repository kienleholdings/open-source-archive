import { TextArea as ZephyrTextArea, Typography } from '@kienleholdings/zephyr-react';
import type { TextAreaProps } from '@kienleholdings/zephyr-react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

export function TextArea({ classNames, label, name, placeholder }: TextAreaProps) {
  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        const hasError = fieldProps.meta.touched && fieldProps.meta.error;
        return (
          <>
            <ZephyrTextArea
              additionalInputProps={{
                ...fieldProps.field,
                'aria-describedby': hasError ? `input-${name}-error` : undefined,
                'aria-invalid': hasError ? 'true' : 'false',
              }}
              classNames={classNames}
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

export default TextArea;
