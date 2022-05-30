import { useSignUp } from '@clerk/clerk-react';
import { Input } from '@kienleholdings/zephyr-formik';
import { Alert, Button, Container, Link, Typography } from '@kienleholdings/zephyr-react';
import type { ContainerProps } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as yup from 'yup';

import type { AccountMode } from 'types';
import { parseErrorMessage } from 'utils/errorHandling';

interface SignupProps {
  className?: string;
  loginLink?: ReactNode;
  loginText?: string;
  mode?: AccountMode;
  onSuccess: () => void;
  size?: ContainerProps['size'];
  title?: string;
  verificationTitle?: string;
}

const SIGNUP_INITIAL_VALUES = { username: '', password: '' };
const VERIFICATION_INITIAL_VALUES = { verificationCode: '' };
// If we don't include **all** possible initial values React throws an error along the lines of
// "component is changing a controlled input to be uncontrolled". No idea why but this fixes it
const BUGFIX_INITIAL_VALUES = { ...SIGNUP_INITIAL_VALUES, ...VERIFICATION_INITIAL_VALUES };

function Signup({
  className,
  loginLink = <Link href="/login">Log In</Link>,
  loginText = 'Already have an account?',
  mode = 'email',
  onSuccess,
  size = 'long-form',
  title = 'Sign Up',
  verificationTitle = 'Verify Your Account',
}: SignupProps) {
  const { signUp } = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const usernameInputProps = useMemo(() => {
    if (mode === 'email') {
      return { label: 'Email Address', type: 'email' };
    }
    if (mode === 'phone') {
      return { label: 'Phone Number', type: 'tel' };
    }
    return { label: 'Email Address or Phone Number', type: 'text' };
  }, [mode]);

  const signupValidationSchema = useMemo(
    () =>
      yup.object({
        username: yup
          .string()
          .required(
            `${mode === 'phone' ? 'A' : 'An'} ${usernameInputProps.label} is required to sign up`
          ),
        password: yup.string().required('A Password is required to sign up'),
      }),
    [mode, usernameInputProps]
  );

  const verificationValidationSchema = useMemo(
    () =>
      yup.object({
        verificationCode: yup.string().required('A Verification Code is required to sign up'),
      }),
    []
  );

  const handleSignup = useCallback(
    async ({ username, password }: typeof SIGNUP_INITIAL_VALUES) => {
      setLoading(true);
      setError(null);
      try {
        await signUp?.create({
          emailAddressOrPhoneNumber: username,
          password,
        });

        await signUp?.prepareVerification({
          strategy: signUp?.emailAddress ? 'email_code' : 'phone_code',
        });
        setPendingVerification(true);
      } catch (err) {
        setError(parseErrorMessage(err));
      }
      setLoading(false);
    },
    [setPendingVerification, signUp]
  );

  const handleVerification = useCallback(
    async ({ verificationCode }: typeof VERIFICATION_INITIAL_VALUES) => {
      setLoading(true);
      setError(null);
      try {
        await signUp?.attemptVerification({
          code: verificationCode,
          strategy: signUp?.emailAddress ? 'email_code' : 'phone_code',
        });
        onSuccess();
      } catch (err) {
        setError(parseErrorMessage(err));
      }
      setLoading(false);
    },
    [onSuccess, signUp]
  );

  if (pendingVerification) {
    return (
      <div className={className}>
        <Container size={size}>
          <Typography responsiveHeader type="heading-lg" variant="h1">
            {verificationTitle}
          </Typography>
          <Typography classNames={{ wrapper: 'mb-32' }} type="body-paragraph" variant="p">
            We just sent you a verification code! Enter it here so that we can be sure your account
            is legit and finish signing you up
          </Typography>
          {error && (
            <Alert classNames={{ wrapper: 'mb-16 -mt-16' }} type="negative">
              {error}
            </Alert>
          )}
          <Formik
            initialValues={BUGFIX_INITIAL_VALUES}
            onSubmit={handleVerification}
            validationSchema={verificationValidationSchema}
          >
            <Form>
              <Input htmlType="text" label="Verification Code" name="verificationCode" />
              <div className="flex justify-end">
                <Button htmlType="submit" loading={loading} type="primary">
                  Verify Account
                </Button>
              </div>
            </Form>
          </Formik>
        </Container>
      </div>
    );
  }

  return (
    <div className={className}>
      <Container size={size}>
        <Typography responsiveHeader type="heading-lg" variant="h1">
          {title}
        </Typography>
        {error && (
          <Alert classNames={{ wrapper: 'mb-16' }} type="negative">
            {error}
          </Alert>
        )}
        <Formik
          initialValues={BUGFIX_INITIAL_VALUES}
          onSubmit={handleSignup}
          validationSchema={signupValidationSchema}
        >
          <Form>
            <Input {...usernameInputProps} name="username" />
            <Input htmlType="password" name="password" label="Password" />
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-end">
              <div className="flex-grow mb-8">
                {loginLink && (
                  <>
                    <Typography type="body" variant="span">
                      {loginText}
                    </Typography>{' '}
                    {loginLink}
                  </>
                )}
              </div>
              <Button
                classNames={{ button: 'mb-8' }}
                htmlType="submit"
                loading={loading}
                type="primary"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}

export default Signup;
