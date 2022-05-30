import Button from './Button';
import type { ButtonProps } from './Button';

const ARGS = {
  children: "I'm a button!",
  loading: false,
};

const ARG_TYPES = {
  type: {
    options: ['negative', 'positive', 'primary', 'warning'],
    control: { type: 'select' },
    defaultValue: 'primary',
  },
};

export function Default(props: ButtonProps) {
  return <Button {...props} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
