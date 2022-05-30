import Signup from './Signup';

// eslint-disable-next-line no-alert
const onSuccess = () => alert('Sign Up Successful!');

export function Default() {
  return <Signup onSuccess={onSuccess} />;
}

export function WithoutSignUpLink() {
  return (
    <Signup
      loginLink={
        <a className="text-primary" href="/?story=signup--default">
          Log In
        </a>
      }
      onSuccess={onSuccess}
    />
  );
}
