import { Span } from 'components/Typography';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { HTMLProps } from 'react';

import type { Customization } from 'types';
import {
  customize,
  customizeTopLevel,
  focusNoSelector,
  hoverAnimation,
} from 'utils/commonClassNames';

export interface SwitchProps
  extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'size' | 'value'> {
  custom?: {
    el?: Customization;
    input?: Customization;
    label?: Customization;
    switch?: Customization;
  };
  label: string;
  name: string;
  onChange?: (value: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  value?: boolean;
}

export const buildSwitchStyles = ({
  checked = false,
  className,
  custom,
  focused = false,
  size = 'medium',
}: {
  checked?: boolean;
  className?: string;
  custom?: SwitchProps['custom'];
  focused?: boolean;
  size?: SwitchProps['size'];
}) => ({
  el: customizeTopLevel('flex', className, custom?.el),
  input: customize('absolute h-24 opacity-0 left-checkbox w-24', custom?.input),
  label: customize('', custom?.label),
  switch: customize(
    [
      hoverAnimation,
      'cursor-pointer flex items-center mr-8 rounded-round',
      {
        [focusNoSelector]: focused,
        'bg-primary': checked,
        'bg-raised-border-light dark:bg-raised-border-dark': !checked,
        'h-24': size === 'medium',
        'pl-[4px]': !checked,
        'pl-[20px]': checked,
        'w-40': size === 'medium',
      },
    ],
    custom?.switch
  ),
  switchInner: customize([
    'rounded-round',
    {
      'bg-raised-light dark:bg-raised-dark': !checked,
      'bg-primary-type': checked,
      'h-16': size !== 'large',
      'w-16': size !== 'large',
    },
  ]),
});

function Switch({
  className,
  custom,
  label,
  name,
  onChange,
  size = 'medium',
  value,
  ...props
}: SwitchProps) {
  const checkboxElement = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(value || false);
  const [focused, setFocused] = useState(false);

  const styles = useMemo(
    () => buildSwitchStyles({ checked, className, custom, focused, size }),
    [checked, className, custom, focused, size]
  );

  const handleInputClick = () => {
    const newValue = !checked;
    setChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSwitchClick = useCallback(() => {
    checkboxElement.current?.click();
    checkboxElement.current?.focus();
  }, []);
  return (
    <div className={styles.el}>
      <div aria-hidden="true" className={styles.switch} onClick={handleSwitchClick}>
        <div className={styles.switchInner} />
      </div>
      <label htmlFor={`switch-${name}`}>
        <input
          {...props}
          checked={value}
          className={styles.input}
          id={`switch-${name}`}
          onBlur={(e) => {
            setFocused(false);
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
          onClick={handleInputClick}
          onFocus={() => setFocused(true)}
          ref={checkboxElement}
          type="checkbox"
        />
        <Span className={styles.label}>{label}</Span>
      </label>
    </div>
  );
}

export default Switch;
