import type { GraphQLErrorRes } from './types';

// Errors really can be anything, so we gotta accept any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any, import/prefer-default-export
export const formatError = (err: any): GraphQLErrorRes['errors'] | null => {
  if (!err) {
    return null;
  }
  if (!err.response?.errors?.length) {
    return [
      {
        message: 'An unknown error has occurred, please try again later',
      },
    ];
  }
  return err.response.errors;
};
