import { useSignIn } from '@clerk/clerk-react';
import type { PhoneCodeFactor } from '@clerk/types';
import { Input } from '@kienleholdings/zephyr-formik';
import { Alert, Button, Container, Link, Typography } from '@kienleholdings/zephyr-react';
import type { ContainerProps } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as yup from 'yup';

import type { AccountMode } from 'types';
import { parseErrorMessage } from 'utils/errorHandling';

interface LoginProps {
  className?: string;
  forgotPasswordLink?: ReactNode;
  mode?: AccountMode;
  onSuccess: () => void;
  signupLink?: ReactNode;
  signupText?: string;
  size?: ContainerProps['size'];
  title?: string;
}

const TWO_FACTOR_INITIAL_VALUES = { twoFactorCode: '' };
const LOGIN_INITIAL_VALUES = { username: '', password: '' };
// If we don't include **all** possible initial values React throws an error along the lines of
// "component is changing a controlled input to be uncontrolled". No idea why but this fixes it
const BUGFIX_INITIAL_VALUES = { ...LOGIN_INITIAL_VALUES, ...TWO_FACTOR_INITIAL_VALUES };

function Login({
  className,
  forgotPasswordLink = <Link href="/forgot-password">I forgot my password</Link>,
  mode = 'email',
  onSuccess,
  signupLink = <Link href="/signup">Sign Up</Link>,
  signupText = "Don't have an account?",
  size = 'long-form',
  title = 'Welcome Back!',
}: LoginProps) {
  const { signIn } = useSignIn();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingTwoFactor, setPendingTwoFactor] = useState(false);

  const usernameInputProps = useMemo(() => {
    if (mode === 'email') {
      return { label: 'Email Address', type: 'email' };
    }
    if (mode === 'phone') {
      return { label: 'Phone Number', type: 'tel' };
    }
    return { label: 'Email Address or Phone Number', type: 'text' };
  }, [mode]);

  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup
          .string()
          .required(
            `${mode === 'phone' ? 'A' : 'An'} ${usernameInputProps.label} is required to log in`
          ),
        password: yup.string().required('A Password is required to log in'),
      }),
    [mode, usernameInputProps]
  );

  const twoFactorValidationSchema = useMemo(
    () =>
      yup.object({
        twoFactorCode: yup.string().required('A Two-Factor Code is required to log in'),
      }),
    []
  );

  const handleLogin = useCallback(
    async ({ username, password }: typeof LOGIN_INITIAL_VALUES) => {
      setLoading(true);
      setError(null);
      try {
        const signInAttempt = await signIn?.create({
          identifier: username,
          password,
        });

        if (signInAttempt?.status === 'needs_second_factor') {
          const strategy = 'phone_code';
          const secondFactor = signInAttempt?.supportedSecondFactors?.find(
            (factor) => factor.strategy === strategy
          ) as PhoneCodeFactor | undefined;
          const phoneNumberId = secondFactor?.phoneNumberId;
          if (!phoneNumberId) {
            throw new Error();
          }
          signInAttempt.prepareSecondFactor({
            strategy,
            phoneNumberId,
          });
          setPendingTwoFactor(true);
          setLoading(false);
          return;
        }
        onSuccess();
      } catch (err) {
        setError(parseErrorMessage(err));
      }
      setLoading(false);
    },
    [onSuccess, signIn]
  );

  const handleSecondFactor = useCallback(
    async ({ twoFactorCode }: typeof TWO_FACTOR_INITIAL_VALUES) => {
      setLoading(true);
      setError(null);

      try {
        await signIn?.attemptSecondFactor({
          code: twoFactorCode,
          strategy: 'phone_code',
        });
        onSuccess();
      } catch (err) {
        setError(parseErrorMessage(err));
      }
      setLoading(false);
    },
    [onSuccess, signIn]
  );

  // TODO: Refactor this into an individual component to DRY up app
  if (pendingTwoFactor) {
    return (
      <div className={className}>
        <Container size={size}>
          <Typography responsiveHeader type="heading-lg" variant="h1">
            One Last Thing
          </Typography>
          <Typography classNames={{ wrapper: 'mb-32' }} type="body-paragraph" variant="p">
            Your account has two-factor authentication enabled. In order to log you in, we&apos;ll
            need you to enter the code sent to the two-factor device associated with your account
          </Typography>
          {error && (
            <Alert classNames={{ wrapper: 'mb-16 -mt-16' }} type="negative">
              {error}
            </Alert>
          )}
          <Formik
            initialValues={BUGFIX_INITIAL_VALUES}
            onSubmit={handleSecondFactor}
            validationSchema={twoFactorValidationSchema}
          >
            <Form>
              <Input htmlType="text" label="Two-Factor Code" name="twoFactorCode" />
              <div className="flex flex-wrap justify-end">
                <Button htmlType="submit" loading={loading} type="primary">
                  Verify Two-Factor Code
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
          <Alert classNames={{ wrapper: 'mb-16 -mt-16' }} type="negative">
            {error}
          </Alert>
        )}
        <Formik
          initialValues={BUGFIX_INITIAL_VALUES}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          <Form>
            <Input {...usernameInputProps} name="username" />
            <Input htmlType="password" name="password" label="Password" />
            {forgotPasswordLink && <div className="mb-16">{forgotPasswordLink}</div>}
            <div className="flex flex-wrap items-center justify-end">
              <div className="flex-grow mb-8">
                {signupLink && (
                  <>
                    <Typography type="body" variant="span">
                      {signupText}
                    </Typography>{' '}
                    {signupLink}
                  </>
                )}
              </div>
              <Button
                classNames={{ button: 'mb-8' }}
                htmlType="submit"
                loading={loading}
                type="primary"
              >
                Log In
              </Button>
            </div>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}

export default Login;
