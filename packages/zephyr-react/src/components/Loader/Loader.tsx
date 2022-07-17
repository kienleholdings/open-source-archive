import { HTMLAttributes, useMemo } from 'react';
import type { SVGAttributes } from 'react';

import { Loader as FeatherLoader } from 'components/Icons';
import type { Customization } from 'types';
import { customize, customizeTopLevel } from 'utils/commonClassNames';

export interface LoaderCommonProps {
  custom?: {
    bar?: Customization;
    barWrapper?: Customization;
    el?: Customization;
  };
}

export interface LoaderBarProps extends HTMLAttributes<HTMLDivElement>, LoaderCommonProps {
  type?: 'bar';
}

export interface LoaderSpinnerProps extends SVGAttributes<SVGElement>, LoaderCommonProps {
  type?: 'spinner';
}

export type LoaderProps = LoaderBarProps | LoaderSpinnerProps;

export const buildLoaderStyles = ({
  className,
  custom,
  type,
}: {
  className?: string;
  custom?: LoaderProps['custom'];
  type: LoaderProps['type'];
}) => ({
  bar: customize('bg-primary h-full w-full', custom?.bar),
  barWrapper: customize('animate-pule h-full flex w-full', custom?.barWrapper),
  el: customizeTopLevel(
    [
      {
        'dark:bg-raised-dark light:bg-raised-light': type === 'bar',
        'h-8': type === 'bar',
        'motion-safe:animate-spin': type === 'spinner',
        'text-primary': type === 'spinner',
        'w-full': type === 'bar',
      },
    ],
    className,
    custom
  ),
});

function Loader({ className, custom, type = 'spinner', ...props }: LoaderProps) {
  const styles = useMemo(
    () => buildLoaderStyles({ className, custom, type }),
    [className, custom, type]
  );
  if (type === 'spinner') {
    return (
      <FeatherLoader
        aria-label="This element is loading"
        {...(props as LoaderSpinnerProps)}
        className={styles.el}
      />
    );
  }
  return (
    <div aria-label="This element is loading" {...(props as LoaderBarProps)} className={styles.el}>
      <div className={styles.barWrapper}>
        <div className={styles.bar} />
      </div>
    </div>
  );
}

export default Loader;
