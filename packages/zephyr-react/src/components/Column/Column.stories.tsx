import Column from './Column';
import type { ColumnProps } from './Column';

const ARGS = {
  xs: '12',
  sm: '12',
  md: '12',
  lg: '12',
};

export function Default(props: ColumnProps) {
  return <Column {...props} classNames={{ column: 'bg-primary h-32' }} />;
}

Default.args = ARGS;
