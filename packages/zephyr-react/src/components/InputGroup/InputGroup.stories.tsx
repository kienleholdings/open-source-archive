import Checkbox from 'components/Checkbox';

import InputGroup from './InputGroup';
import type { InputGroupProps } from './InputGroup';

const ARGS = {
  checkboxRadio: false,
  label: 'Input',
};

export function Default(props: InputGroupProps) {
  return (
    <InputGroup {...props}>
      <Checkbox label="Text Checkbox" name="story" />
    </InputGroup>
  );
}

Default.args = ARGS;
