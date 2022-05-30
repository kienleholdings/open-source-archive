import FileUploader from 'components/FileUploader';
import type { FileUploaderProps } from 'components/FileUploader';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

export type FormikFileUploaderProps = Omit<FileUploaderProps, 'onChange' | 'value'>;

export function FormikFileUploader({
  accept,
  className,
  label,
  multiple = false,
  name,
  uploadcarePublicKey,
}: FormikFileUploaderProps) {
  return (
    <Field name={name} type="file">
      {(fieldProps: FieldProps) => {
        console.log(fieldProps);
        return (
          <FileUploader
            accept={accept}
            className={className}
            errorOverride={fieldProps.meta.touched ? fieldProps.meta.error : undefined}
            label={label}
            multiple={multiple}
            name={name}
            onChange={(files) => {
              fieldProps.form.setFieldValue(name, files, true);
            }}
            uploadcarePublicKey={uploadcarePublicKey}
            value={fieldProps.field.value}
          />
        );
      }}
    </Field>
  );
}

export default FormikFileUploader;
