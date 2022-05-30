import Container from './Container';
import type { ContainerProps } from './Container';

const ARGS = {
  children: "I'm content inside a container!",
};

const ARG_TYPES = {
  size: {
    options: ['fluid', 'four-column', 'three-column', 'long-form'],
    control: { type: 'select' },
    defaultValue: 'four-column',
  },
};

export function Default(props: ContainerProps) {
  return <Container {...props} classNames={{ container: 'bg-primary h-32 w-full' }} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
