import { Card, Icon, Typography, utils } from '@kienleholdings/zephyr-react';
import { UploadClient } from '@uploadcare/upload-client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { Accept } from 'react-dropzone';

export interface UploadedFile {
  name: string;
  size: number;
  url: string;
}

export interface FileUploaderProps {
  accept?: Accept;
  className?: string;
  errorOverride?: string;
  label: string;
  multiple?: boolean;
  name: string;
  onChange: (files: UploadedFile[]) => void;
  uploadcarePublicKey: string;
  value: UploadedFile[];
}

export const formatBytes = (bytes: number | null, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';

  const BYTES_IN_KB = 1024;
  const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(BYTES_IN_KB));

  return `${parseFloat((bytes / BYTES_IN_KB ** i).toFixed(dm))} ${SIZES[i]}`;
};

function FileUploader({
  // In most cases we'll only be uploading images, so this is a reasonable default
  accept = { 'image/*': [] },
  className = '',
  label,
  multiple = false,
  name,
  onChange,
  uploadcarePublicKey,
  value,
}: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Uploadcare URLs are always unique, whereas names and sizes might not be
  const onRemove = useCallback(
    (url: string) => {
      // Removing files from uploadcare is annoying and requires a private key. Because of this,
      // we're taking the file storage L here and just removing it from the array sent to the form
      onChange(value.filter((file) => file.url !== url));
    },
    [onChange, value]
  );

  const onUpload = useCallback(
    async (files: File[]) => {
      const client = new UploadClient({ publicKey: uploadcarePublicKey });
      setUploading(true);
      setError(null);
      try {
        if (multiple) {
          const newFiles = await Promise.all(files.map((file) => client.uploadFile(file)));
          onChange([
            ...value,
            ...newFiles.map((file) => ({
              name: file.name || '',
              size: file.size || 0,
              url: file.cdnUrl || '',
            })),
          ]);
        } else {
          const file = await client.uploadFile(files[0]);
          onChange([{ name: file.name || '', size: file.size || 0, url: file.cdnUrl || '' }]);
        }
      } catch (err) {
        console.error(err);
        setError(err?.message ?? 'An unknown error has occurred, please try again later');
      }

      setUploading(false);
    },
    [multiple, onChange, uploadcarePublicKey, value]
  );

  // @ts-expect-error: Need to fix this in a future PR
  const { getInputProps, getRootProps } = useDropzone({ onDrop: onUpload, accept });

  return (
    <>
      <label
        className={`${utils.commonClassNameUtils.focus} block mb-16 ${className}`}
        htmlFor={`fileinput-${name}`}
        {...getRootProps()}
      >
        <Typography
          classNames={{ wrapper: 'block mb-8 mr-8 w-full' }}
          type="body-bold"
          variant="span"
        >
          {label}
        </Typography>
        <Card>
          <div className="flex flex-col items-center justify-center p-16 sr-hidden">
            {!uploading && !value.length && (
              <Typography type="body" variant="p">
                Drag {multiple ? 'Files' : 'File'} Here or{' '}
                <span className="cursor-pointer  font-bold text-primary">Browse</span>
              </Typography>
            )}
            {((!uploading && !multiple) || multiple) && (
              <div className="flex flex-col items-end">
                {value.map((file) => (
                  <div className="flex mb-16" key={file.url}>
                    <Typography type="body" variant="p">
                      {file.name} ({formatBytes(file.size)})
                    </Typography>
                    <button
                      aria-label={`Remove File ${file.name}`}
                      className={`ml-8 ${utils.commonClassNameUtils.focus}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(file.url);
                      }}
                      type="button"
                    >
                      <Icon className="text-negative hover:text-negative-light" icon="trash" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!uploading && !!value.length && (
              <Typography
                classNames={{ wrapper: 'cursor-pointer font-bold text-primary' }}
                type="body"
                variant="p"
              >
                {multiple ? 'Add Another File' : 'Choose a Different File'}
              </Typography>
            )}

            {uploading && (
              <Icon
                aria-label="Uploading your file, please wait"
                className="ml-8 animate-spin"
                icon="spinner"
              />
            )}
          </div>
        </Card>
      </label>
      {error && (
        <div aria-live="assertive" className="-mt-8 mb-16" id={`fileinput-${name}-error`}>
          <Typography classNames={{ wrapper: 'text-negative' }} type="body" variant="span">
            {error}
          </Typography>
        </div>
      )}
      <input
        aria-describedby="To upload files, click here"
        disabled={uploading}
        id={`fileinput-${name}`}
        multiple={multiple}
        name={name}
        type="file"
        {...getInputProps()}
      />
    </>
  );
}

export default FileUploader;
