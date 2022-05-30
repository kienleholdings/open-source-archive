import { useState } from 'react';
import Button from 'components/Button';

import Toast from './Toast';
import type { ToastProps } from './Toast';

const ARGS = {
  children: "I'm a toast!",
};

const ARG_TYPES = {
  type: {
    options: ['negative', 'positive', 'primary', 'warning'],
    control: { type: 'select' },
    defaultValue: 'primary',
  },
};

export function Default(props: ToastProps) {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setToastOpen(true)} type="primary">
        Open Toast
      </Button>
      <Toast {...props} setVisible={setToastOpen} visible={toastOpen} />
    </>
  );
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
