import ForgotPassword from './ForgotPassword';

// eslint-disable-next-line no-alert
const onSuccess = () => alert('Recovery Successful!');

export function Default() {
  return <ForgotPassword onSuccess={onSuccess} />;
}

export function WithPhoneNumber() {
  return <ForgotPassword onSuccess={onSuccess} mode="phone" />;
}

export function WithPhoneOrEmail() {
  return <ForgotPassword onSuccess={onSuccess} mode="phoneAndEmail" />;
}
