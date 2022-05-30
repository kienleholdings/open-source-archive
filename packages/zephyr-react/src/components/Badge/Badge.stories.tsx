import Badge from './Badge';
import type { BadgeProps } from './Badge';

const ARGS = {
  children: '420',
};

const ARG_TYPES = {
  type: {
    options: ['negative', 'positive', 'primary', 'warning'],
    control: { type: 'select' },
    defaultValue: 'primary',
  },
};

export function Default(props: BadgeProps) {
  return <Badge {...props} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
