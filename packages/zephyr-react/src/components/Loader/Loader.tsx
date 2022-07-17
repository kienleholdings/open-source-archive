import { useMemo } from 'react';
import type { SVGAttributes } from 'react';

import { Loader as FeatherLoader } from 'components/Icons';
import type { Customization } from 'types';
import { customizeTopLevel } from 'utils/commonClassNames';

export interface LoaderProps extends SVGAttributes<SVGElement> {
  custom?: {
    el?: Customization;
  };
  type?: 'bar' | 'spinner';
}

export const buildLoaderStyles = ({
  className,
  custom,
  type,
}: {
  className?: string;
  custom?: LoaderProps['custom'];
  type: LoaderProps['type'];
}) => ({
  el: customizeTopLevel(
    [{ 'motion-safe:animate-spin': type === 'spinner', 'text-primary': type === 'spinner' }],
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
    return <FeatherLoader aria-label="This element is loading" {...props} className={styles.el} />;
  }
  return null;
}

export default Loader;
