import Typography from './Typography';
import type { TypographyProps } from './Typography';

const ARGS = {
  children: "I'm text!",
  responsiveHeader: false,
};

const ARG_TYPES = {
  type: {
    options: [
      'heading-xxl',
      'heading-xl',
      'heading-lg',
      'heading-md',
      'heading-sm',
      'heading-xs',
      'body',
      'body-paragraph',
      'body-bold',
      'body-italic',
    ],
    control: { type: 'select' },
    defaultValue: 'body',
  },
  variant: {
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'div', 'span', 'em', 'strong'],
    control: { type: 'select' },
    defaultValue: 'p',
  },
};

export function Default(props: TypographyProps) {
  return <Typography {...props} />;
}

Default.args = ARGS;
Default.argTypes = ARG_TYPES;
