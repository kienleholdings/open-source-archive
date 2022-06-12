import { Span } from '@kienleholdings/zephyr-react';
import clsx from 'clsx';
import { useMemo } from 'react';

interface ColorBlockProps {
  color:
    | 'accent'
    | 'border-dark'
    | 'border-light'
    | 'error'
    | 'primary'
    | 'raised-dark'
    | 'raised-light'
    | 'type-dark'
    | 'type-light';
  dark?: boolean;
  light?: boolean;
}

function ColorBlock({ color, dark, light }: ColorBlockProps) {
  const colorProps = useMemo(() => {
    switch (color) {
      case 'accent': {
        return {
          name: 'Lapiz (Accent)',
          primaryClass: 'bg-accent',
          lightClass: 'bg-accent-light',
          darkClass: 'bg-accent-dark',
        };
      }
      case 'border-dark': {
        return {
          name: 'Raised Element Border',
          primaryClass: 'bg-raised-border-dark',
        };
      }
      case 'border-light': {
        return {
          name: 'Raised Element Border',
          primaryClass: 'bg-raised-border-light',
        };
      }
      case 'error': {
        return {
          name: 'Rose (Error)',
          primaryClass: 'bg-error',
          lightClass: 'bg-error-light',
          darkClass: 'bg-error-dark',
        };
      }
      case 'primary': {
        return {
          name: 'Tart Orange (Primary)',
          primaryClass: 'bg-primary',
          lightClass: 'bg-primary-light',
          darkClass: 'bg-primary-dark',
        };
      }
      case 'raised-dark': {
        return {
          name: 'Raised Element Background',
          primaryClass: 'bg-raised-dark',
        };
      }
      case 'raised-light': {
        return {
          name: 'Raised Element Background',
          primaryClass: 'bg-raised-light',
        };
      }
      case 'type-dark': {
        return {
          name: 'Typography',
          primaryClass: 'bg-fg-dark',
        };
      }
      case 'type-light': {
        return {
          name: 'Typography',
          primaryClass: 'bg-fg-light',
        };
      }
      default:
        return null;
    }
  }, [color]);
  return (
    <div className="flex items-center">
      {colorProps?.darkClass && colorProps?.lightClass ? (
        <div className="flex flex-col">
          <div className={clsx('h-32 w-64', colorProps?.primaryClass)} />
          <div className="flex">
            <div className={clsx('h-32 w-32', colorProps.darkClass)} />
            <div className={clsx('h-32 w-32', colorProps.lightClass)} />
          </div>
        </div>
      ) : (
        <div className={clsx('h-64 w-64', colorProps?.primaryClass)} />
      )}

      <Span
        className={clsx('ml-16', {
          'text-fg-dark': dark,
          'text-fg-light dark:text-fg-light': light,
        })}
      >
        {colorProps?.name}
      </Span>
    </div>
  );
}

export default ColorBlock;
