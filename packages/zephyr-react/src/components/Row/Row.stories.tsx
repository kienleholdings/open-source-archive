import Column from 'components/Column';

import Row from './Row';
import type { RowProps } from './Row';

const ARGS = {
  gutter: true,
};

export function Default(props: RowProps) {
  return (
    <Row {...props}>
      <Column classNames={{ column: 'bg-primary-light h-32' }} gutter={false} xs="4" />
      <Column classNames={{ column: 'bg-primary h-32' }} gutter={false} xs="4" />
      <Column classNames={{ column: 'bg-primary-dark h-32' }} gutter={false} xs="4" />
    </Row>
  );
}

Default.args = ARGS;
