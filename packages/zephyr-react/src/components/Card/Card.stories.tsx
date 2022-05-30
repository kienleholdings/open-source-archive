import Card from './Card';
import type { CardProps } from './Card';

const ARGS = {
  children: "I'm a card!",
};

export function Default(props: CardProps) {
  return <Card {...props} />;
}

Default.args = ARGS;

export function WithHeader(props: CardProps) {
  return <Card {...props} />;
}

WithHeader.args = {
  ...ARGS,
  header: 'Card Header',
};

export function WithFooter(props: CardProps) {
  return <Card {...props} />;
}

WithFooter.args = {
  ...ARGS,
  footer: 'Card Footer',
};

export function WithHeaderAndFooter(props: CardProps) {
  return <Card {...props} header="Card Header" footer="Card Footer" />;
}

WithHeaderAndFooter.args = {
  ...ARGS,
  header: 'Card Header',
  footer: 'Card Footer',
};

export function WithHeaderFooterAndPreBody(props: CardProps) {
  return <Card {...props} header="Card Header" footer="Card Footer" />;
}

WithHeaderFooterAndPreBody.args = {
  ...ARGS,
  header: 'Card Header',
  footer: 'Card Footer',
  preBody: (
    <img src="https://picsum.photos/256/128" alt="Something randomly generated from Picsum" />
  ),
};
