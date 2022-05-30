import { useEffect, useState } from 'react';

import InputGroup from 'components/InputGroup';
import type { InputGroupProps } from 'components/InputGroup';
import RadioButton from 'components/RadioButton';
import type { RadioButtonProps } from 'components/RadioButton';
import type { DisplayValueObject } from 'types';

export interface RadioGroupProps {
  /**
   * Will add or override tailwind classes
   */
  classNames?: InputGroupProps['classNames'];
  /**
   * The items to display in the radio group
   */
  items: DisplayValueObject[];
  /**
   * The text to show the user above the input
   */
  label: string;
  /**
   * A unique, internal name for the input to be used for matching the label with the input and form submission
   */
  name: string;
  /**
   * A callback function, usually to control state in a form
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  /**
   * Will add or override tailwind classes in the self-contained radio buttons
   */
  radioButtonClassNames?: RadioButtonProps['classNames'];
  /**
   * The radio button's current value, usually provided by a form
   */
  value?: string;
}

/**
 * A form element used for making a single selection between a small group of items
 */
export function RadioGroup({
  classNames,
  items,
  label,
  name,
  onChange,
  radioButtonClassNames,
  value,
}: RadioGroupProps) {
  useEffect(() => {
    if ((!onChange && value) || (onChange && !value)) {
      // eslint-disable-next-line no-console
      console.error(
        `zephyr-react: When you pass in a value or onClick callback, you must pass in both params, not just one. onChange: ${onChange}, value: ${value}`
      );
    }
  }, [onChange, value]);

  const [selected, setSelected] = useState(value || '');

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [onChange, selected]);

  return (
    <InputGroup checkboxRadio classNames={classNames} label={label}>
      {items.map((item, key) => (
        <RadioButton
          checked={selected === item.value}
          classNames={radioButtonClassNames}
          id={item.value}
          isLastInGroup={key === items.length - 1}
          key={item.value}
          label={item.display}
          name={name}
          onChange={setSelected}
          value={item.value}
        />
      ))}
    </InputGroup>
  );
}

export default RadioGroup;
