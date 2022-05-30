import { useSignIn } from '@clerk/clerk-react';
import type { EmailCodeFactor, PhoneCodeFactor } from '@clerk/types';
import { Input } from '@kienleholdings/zephyr-formik';
import { Alert, Button, Container, Typography } from '@kienleholdings/zephyr-react';
import type { ContainerProps } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';

import type { AccountMode } from 'types';
import { parseErrorMessage } from 'utils/errorHandling';

interface ForgotPasswordProps {
  className?: string;
  mode?: AccountMode;
  onSuccess: () => void;
  size?: ContainerProps['size'];
  title?: string;
}

const TWO_FACTOR_INITIAL_VALUES = { twoFactorCode: '' };
const USERNAME_INITIAL_VALUES = { username: '' };
const VERIFICATION_INITIAL_VALUES = { verificationCode: '' };
// If we don't include **all** possible initial values React throws an error along the lines of
// "component is changing a controlled input to be uncontrolled". No idea why but this fixes it
const BUGFIX_INITIAL_VALUES = {
  ...TWO_FACTOR_INITIAL_VALUES,
  ...USERNAME_INITIAL_VALUES,
  ...VERIFICATION_INITIAL_VALUES,
};

function ForgotPassword({
  className,
  mode = 'email',
  onSuccess,
  size = 'long-form',
  title = 'Forgot Password',
}: ForgotPasswordProps) {
  const { signIn } = useSignIn();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [pendingTwoFactor, setPendingTwoFactor] = useState(false);
  const [usingEmail, setUsingEmail] = useState(true);

  const usernameInputProps = useMemo(() => {
    if (mode === 'email') {
      return { label: 'Email Address', type: 'email' };
    }
    if (mode === 'phone') {
      return { label: 'Phone Number', type: 'tel' };
    }
    return { label: 'Email Address or Phone Number', type: 'text' };
  }, [mode]);

  const usernameValidationSchema = useMemo(
    () =>
      yup.object({
        username: yup
          .string()
          .required(
            `${mode === 'phone' ? 'A' : 'An'} ${
              usernameInputProps.label
            } is required to recover your account`
          ),
      }),
    [mode, usernameInputProps]
  );

  const verificationValidationSchema = useMemo(
    () =>
      yup.object({
        verificationCode: yup
          .string()
          .required('A Recovery Code is required to recover your account'),
      }),
    []
  );

  const twoFactorValidationSchema = useMemo(
    () =>
      yup.object({
        twoFactorCode: yup
          .string()
          .required('A Two-Factor Code is required to recover your account'),
      }),
    []
  );

  const handleSendRecovery = useCallback(
    async ({ username }: typeof USERNAME_INITIAL_VALUES) => {
      const localUsingEmail = username.includes('@');
      setUsingEmail(localUsingEmail);
      setLoading(true);
      setError(null);
      try {
        const signInAttempt = await signIn?.create({
          identifier: username,
        });

        // We can't use usingEmail here as there's a chance the component might not have picked up the change yet
        if (localUsingEmail) {
          const strategy = 'email_code';
          const firstFactor = signIn?.supportedFirstFactors?.find(
            (factor) => factor.strategy === strategy
          ) as EmailCodeFactor | undefined;
          const emailAddressId = firstFactor?.emailAddressId;
          if (!emailAddressId) {
            throw new Error();
          }
          await signInAttempt?.prepareFirstFactor({
            emailAddressId,
            strategy,
          });
        } else {
          const strategy = 'phone_code';
          const firstFactor = signIn?.supportedFirstFactors?.find(
            (factor) => factor.strategy === strategy
          ) as PhoneCodeFactor | undefined;
          const phoneNumberId = firstFactor?.phoneNumberId;
          if (!phoneNumberId) {
            throw new Error();
          }
          await signInAttempt?.prepareFirstFactor({
            phoneNumberId,
            strategy,
          });
        }

        setPendingVerification(true);
      } catch (err) {
        setError(parseErrorMessage(err));
      }
      setLoading(false);
    },
    [setPendingVerification, signIn]
  );

  const handleVerification = useCallback(
    async ({ verificationCode }: typeof VERIFICATION_INITIAL_VALUES) => {
      setLoading(true);
      setError(null);
      try {
        const firstFactorAttempt = await signIn?.attemptFirstFactor({
          code: verificationCode,
          strategy: usingEmail ? 'email_code' : 'phone_code',
        });

        if (firstFactorAttempt?.status === 'needs_second_factor') {
          const strategy = 'phone_code';
          const secondFactor = firstFactorAttempt?.supportedSecondFactors?.find(
            (factor) => factor.strategy === strategy
          ) as PhoneCodeFactor | undefined;
          const phoneNumberId = secondFactor?.phoneNumberId;
          if (!phoneNumberId) {
            throw new Error();
          }
          firstFactorAttempt.prepareSecondFactor({
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
    [usingEmail, onSuccess, signIn]
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
            Your account has two-factor authentication enabled. In order to recover your account,
            we&apos;ll need you to enter the code sent to the two-factor device associated with your
            account
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
              <div className="flex justify-end">
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

  if (pendingVerification) {
    return (
      <div className={className}>
        <Container size={size}>
          <Typography responsiveHeader type="heading-lg" variant="h1">
            {title}
          </Typography>
          <Typography classNames={{ wrapper: 'mb-32' }} type="body-paragraph" variant="p">
            We just sent you a recovery code! Enter it here so that we can be sure that you are who
            you say you are and we can recover your account
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
              <Input htmlType="text" label="Recovery Code" name="verificationCode" />
              <div className="flex justify-end">
                <Button htmlType="submit" loading={loading} type="primary">
                  Verify Recovery Code
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
          onSubmit={handleSendRecovery}
          validationSchema={usernameValidationSchema}
        >
          <Form>
            <Input {...usernameInputProps} name="username" />
            <div className="flex justify-end">
              <Button htmlType="submit" loading={loading} type="primary">
                Send Recovery Code
              </Button>
            </div>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}

export default ForgotPassword;
