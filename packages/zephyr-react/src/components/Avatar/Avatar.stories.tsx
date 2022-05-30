import Avatar from './Avatar';
import type { AvatarProps } from './Avatar';

const ARGS = {
  image: 'https://picsum.photos/64',
};

const ARG_TYPES = {
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'select' },
    defaultValue: 'md',
  },
};

export function Default(props: AvatarProps) {
  return <Avatar {...props} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;

export function WithImageComponentOverride(props: AvatarProps) {
  return (
    <Avatar {...props} imageComponentOverride={<div className="bg-negative h-full w-full" />} />
  );
}

WithImageComponentOverride.args = ARGS;
WithImageComponentOverride.argTypes = ARG_TYPES;

export function WithNoImage(props: AvatarProps) {
  return <Avatar {...props} image={undefined} />;
}

WithNoImage.args = ARGS;
WithNoImage.argTypes = ARG_TYPES;
