import { useState } from 'react';
import Button from 'components/Button';

import Alert from './Alert';
import type { AlertProps } from './Alert';

const ARGS = {
  children: "I'm an alert!",
};

const ARG_TYPES = {
  type: {
    options: ['negative', 'positive', 'primary', 'warning'],
    control: { type: 'select' },
    defaultValue: 'primary',
  },
};

export function Default(props: AlertProps) {
  return <Alert {...props} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;

export function Closeable(props: AlertProps) {
  const [closed, setClosed] = useState(false);
  return closed ? (
    <Button onClick={() => setClosed(false)} type="primary">
      Reset
    </Button>
  ) : (
    <Alert {...props} onClose={() => setClosed(true)}>
      I&apos;m an alert!
    </Alert>
  );
}

Closeable.args = ARGS;
Closeable.argTypes = ARG_TYPES;
