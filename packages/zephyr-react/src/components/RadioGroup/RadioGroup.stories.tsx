import RadioGroup from './RadioGroup';
import type { RadioGroupProps } from './RadioGroup';

const ARGS = {
  label: 'Uncontrolled Radio Group',
};

export function Default(props: RadioGroupProps) {
  return (
    <RadioGroup
      {...props}
      items={[
        {
          display: 'Radio 1',
          value: 'radio1',
        },
        {
          display: 'Radio 2',
          value: 'radio2',
        },
      ]}
      name="uncontrolled-radio-group"
    />
  );
}

Default.args = ARGS;
