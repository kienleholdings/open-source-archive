import Input from './Input';
import type { InputProps } from './Input';

const ARGS = {
  htmlType: 'text',
  label: 'Input',
  placeholder: 'This is a placeholder',
};

export function Default(props: InputProps) {
  return <Input {...props} name="story" />;
}

Default.args = ARGS;
