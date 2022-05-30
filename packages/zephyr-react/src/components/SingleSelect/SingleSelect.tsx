import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import type { ClassName, DisplayValueObject } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

export interface SingleSelectProps {
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    button?: ClassName;
    label?: ClassName;
    list?: ClassName;
    listItem?: ClassName;
    listItemBody?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * The selectable items that populate the dropdown's list
   */
  items: DisplayValueObject[];
  /**
   * The text to show the user above the dropdown button
   */
  label: string;
  /**
   * An internal-only name used for accessibility
   */
  name: string;
  /**
   * What to display on the button when no value is selected. When not provided, will be replaced with "Select {label}"
   */
  noValueLabel?: string;
  /**
   * A callback function, usually to control state in a form
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  /**
   * The radio button's current value, usually provided by a form
   */
  value: string | undefined;
}

/**
 * A form element used for making a single selection between a large group of items
 */
export function SingleSelect({
  classNames,
  items,
  label,
  name,
  noValueLabel,
  onChange,
  value,
}: SingleSelectProps) {
  const valueIndex = items.findIndex((item) => item.value === value);
  const [dropdownWidth, setDropdownWidth] = useState('auto');
  const [focusedItem, setFocusedItem] = useState(valueIndex === -1 ? 0 : valueIndex);
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(value || '');

  const buttonElement = useRef<HTMLButtonElement>(null);
  const listElement = useRef<HTMLUListElement>(null);
  const rootElement = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateDropdownWidth = () => {
      setDropdownWidth(`${buttonElement.current?.clientWidth}px` ?? 'auto');
    };

    updateDropdownWidth();

    window.addEventListener('resize', updateDropdownWidth);
    return () => window.removeEventListener('resize', updateDropdownWidth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // The below line breaks typescript but works so I'm disabling that rule. Idk if there's a better solution for outside clicks - James
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (rootElement.current && !rootElement.current.contains(event.target as any) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, rootElement]);

  useEffect(() => {
    // We typecheck here to ensure that the button is not selected by default
    if (open && typeof open === 'boolean') {
      listElement.current?.focus();
      return;
    }
    if (!open && typeof open === 'boolean') {
      buttonElement.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (search.length && open) {
        setSearch('');
        const itemIndex = items.findIndex(
          (item) => item.display.substr(0, search.length).toLowerCase() === search.toLowerCase()
        );

        setFocusedItem(itemIndex === -1 ? 0 : itemIndex);
      }
    }, 600);

    return () => clearTimeout(searchDebounce);
  }, [items, open, search]);

  const computedClassNames = useMemo(
    () => ({
      button: computeClassName(
        [
          focus,
          'bg-white',
          'dark:bg-black',
          'border',
          'border-bg-light',
          'dark:border-bg-dark',
          'flex',
          'items-center',
          'px-16',
          'py-8',
          'text-left',
          'w-full',
          {
            'font-bold': !!selected.length,
            rounded: !open,
            'rounded-t': open,
            'shadow-level-2': !open,
            'shadow-level-3': open,
          },
        ],
        classNames?.button
      ),
      label: computeClassName(['block', 'font-bold', 'mb-8', 'mr-8', 'w-full'], classNames?.label),
      list: computeClassName(
        [
          'absolute',
          'bg-white',
          'border-b',
          'border-l',
          'border-r',
          'border-bg-light',
          'focus:outline-none',
          'overflow-hidden',
          'rounded-b',
          'shadow-level-3',
        ],
        classNames?.list
      ),
      listItemBody: (item: DisplayValueObject, key: number) =>
        computeClassName(
          [
            'block',
            'px-16',
            'py-8',
            'cursor-pointer',
            {
              'bg-white dark:bg-black': selected !== item.value,
              'bg-primary': selected === item.value,
              'bg-primary-light': focusedItem === key && selected !== item.value,
              'text-primary-type': focusedItem === key || selected === item.value,
              'hover:bg-primary-light': focusedItem !== key && selected !== item.value,
              'hover:text-primary-type': focusedItem !== key && selected !== item.value,
            },
          ],
          classNames?.listItemBody
        ),
      wrapper: computeClassName(['mb-16', 'relative', 'text-black'], classNames?.wrapper),
    }),
    [classNames, focusedItem, open, selected]
  );

  const onButtonClick = () => {
    setOpen(!open);
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown') {
      return;
    }

    event.preventDefault();
    setOpen(true);
  };

  const selectWithCallback = (newVal: string) => {
    setSelected(newVal);
    if (onChange) {
      onChange(newVal);
    }
    setOpen(false);
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const newItem = focusedItem + 1;
        if (newItem >= items.length) {
          break;
        }
        setFocusedItem(newItem);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const newItem = focusedItem - 1;
        if (newItem < 0) {
          break;
        }
        setFocusedItem(newItem);
        break;
      }
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        break;
      case 'Enter':
        event.preventDefault();
        selectWithCallback(items[focusedItem].value);
        break;
      default: {
        const key = event.key.toLowerCase();

        if (key === ' ' && !search.length) {
          event.preventDefault();
          selectWithCallback(items[focusedItem].value);
          return;
        }

        if (key.length !== 1) {
          return;
        }
        const isLetter = key >= 'a' && key <= 'z';
        const isNumber = key >= '0' && key <= '9';
        if (isLetter || isNumber || key === ' ') {
          setSearch(`${search}${key}`);
        }
      }
    }
  };

  return (
    <div className={computedClassNames.wrapper} ref={rootElement}>
      <div className="flex flex-wrap">
        <span id={`single-select-${name}-label`} className={computedClassNames.label}>
          <Typography type="body-bold" variant="span">
            {label}
          </Typography>
        </span>
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={`single-select-${name}-label single-select-${name}-button`}
          className={computedClassNames.button}
          id={`single-select-${name}-button`}
          name={name}
          onClick={onButtonClick}
          onKeyDown={onButtonKeyDown}
          ref={buttonElement}
          type="button"
        >
          <Typography classNames={{ wrapper: 'block flex-grow' }} type="body" variant="span">
            {selected && items.find((item) => item.value === selected)?.display}
            {!selected && !noValueLabel && <>Select {label}</>}
            {!selected && noValueLabel && noValueLabel}
          </Typography>
          <Icon icon={open ? 'angle-up' : 'angle-down'} />
        </button>
      </div>
      {open && (
        <ul
          aria-activedescendant={items.find((item) => item.value === selected)?.value ?? ''}
          aria-labelledby={`single-select-${name}-button`}
          className={computedClassNames.list}
          id={`single-select-${name}-list`}
          onKeyDown={onListKeyDown}
          ref={listElement}
          role="listbox"
          style={{ width: dropdownWidth }}
          tabIndex={-1}
        >
          {items.map((item, key) => (
            <li
              aria-selected={focusedItem === key}
              id={`single-select-${name}-item-${item.value}`}
              onClick={() => {
                setFocusedItem(key);
                selectWithCallback(item.value);
              }}
              onKeyDown={(event) => {
                if (['Space', 'Enter'].includes(event.key)) {
                  setFocusedItem(key);
                  selectWithCallback(item.value);
                }
              }}
              key={item.value}
              role="option"
            >
              <Typography
                classNames={{ wrapper: computedClassNames.listItemBody(item, key) }}
                type="body"
                variant="span"
              >
                {item.display}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SingleSelect;
