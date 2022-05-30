import TextArea from './TextArea';
import type { TextAreaProps } from './TextArea';

const ARGS = {
  label: 'Text Area',
  placeholder: 'This is a placeholder',
};

export function Default(props: TextAreaProps) {
  return <TextArea {...props} name="story" />;
}

Default.args = ARGS;
