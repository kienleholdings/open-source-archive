import Typography from 'components/Typography';

import Tooltip from './Tooltip';
import type { TooltipProps } from './Tooltip';

const ARGS = {
  text: "I'm a tooltip!",
};

const ARG_TYPES = {
  position: {
    options: ['bottom', 'left', 'right', 'top'],
    control: { type: 'select' },
    defaultValue: 'top',
  },
};

export function Default(props: TooltipProps) {
  return (
    <Tooltip {...props}>
      <Typography type="body" variant="p">
        Hover over me for a tooltip
      </Typography>
    </Tooltip>
  );
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
