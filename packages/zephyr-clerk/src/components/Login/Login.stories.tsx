import Login from './Login';

// eslint-disable-next-line no-alert
const onSuccess = () => alert('Login Successful!');

export function Default() {
  return <Login onSuccess={onSuccess} />;
}

export function WithoutSignUpLink() {
  return <Login onSuccess={onSuccess} signupLink={null} />;
}

export function WithPhoneNumber() {
  return <Login onSuccess={onSuccess} mode="phone" />;
}

export function WithPhoneOrEmail() {
  return <Login onSuccess={onSuccess} mode="phoneAndEmail" />;
}
