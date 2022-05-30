import Icon from './Icon';
import type { IconProps } from './Icon';

const ARGS = {};

const ARG_TYPES = {
  icon: {
    options: [
      'angle-down',
      'angle-up',
      'bars',
      'caret-down',
      'caret-left',
      'caret-right',
      'caret-up',
      'check',
      'times',
      'user',
    ],
    control: { type: 'select' },
    defaultValue: 'angle-down',
  },
};

export function Default(props: IconProps) {
  return <Icon {...props} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
