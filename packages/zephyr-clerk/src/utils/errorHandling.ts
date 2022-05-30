import type { ClerkAPIError } from '@clerk/types';

export const DEFAULT_ERROR_MESSAGE =
  "Uh oh! We ran into an unknown error. Try again later and hopefully it'll be resolved";

export const makeErrorFriendly = (message: string) => {
  switch (message) {
    case 'Password is incorrect. Try again, or use another method.':
      return "Whoops! It looks like that password is incorrect. Make sure you've entered it properly and try again";
    case 'Incorrect code':
      return "Whoops! It looks like that code is incorrect. Make sure you've entered it properly and try again";
    case 'You cannot sign up since this is a restricted application.':
      return "Hmm, it looks like you don't have permission to sign up for this application, sorry!";
    case "Couldn't find your account.":
      return "Hmm, we couldn't find an account with that information, are you sure you've signed up?";
    case "You're currently in single session mode. You can only be signed into one account at a time.":
      return "Whoops! It looks like you tried to log in while already logged in, unfortunately that doesn't work";
    case 'That email address is taken. Please try another.':
      return 'Hmm, it looks this account already exists. Did you mean to log in instead?';
    default:
      return message;
  }
};

export const parseErrorMessage = (err: { errors?: ClerkAPIError[]; message?: string }) => {
  if (!err) {
    return DEFAULT_ERROR_MESSAGE;
  }

  if (err.errors) {
    return makeErrorFriendly(err.errors?.[0]?.longMessage ?? DEFAULT_ERROR_MESSAGE);
  }

  return err?.message ?? DEFAULT_ERROR_MESSAGE;
};
