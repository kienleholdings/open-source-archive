import type { ReactNode } from 'react';
import Footer from './Footer';
import type { FooterProps } from './Footer';

const ARGS = {
  companyName: 'Kienle Technologies',
};

const ARG_TYPES = {
  containerSize: {
    options: ['fluid', 'four-column', 'three-column', 'long-form'],
    control: { type: 'select' },
    defaultValue: 'four-column',
  },
};

interface BottomLinkProps {
  children: ReactNode;
  className: string;
  href: string;
}

const bottomLinks = [
  {
    display: 'Item 1',
    value: 'item1',
  },
  {
    display: 'Item 2',
    value: 'item2',
  },
];
const col = <div className="bg-black h-128 w-full" />;
const logo = <div className="bg-black h-64 w-256" />;

function BottomLink({ children, className, href }: BottomLinkProps) {
  return (
    <button
      className={className}
      onClick={() => {
        // eslint-disable-next-line no-alert
        alert(href);
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export function FourColumns(props: FooterProps) {
  return (
    <Footer
      {...props}
      BottomLink={BottomLink}
      bottomLinks={bottomLinks}
      col1={col}
      col2={col}
      col3={col}
      logo={logo}
    />
  );
}

FourColumns.args = ARGS;
FourColumns.argTypes = ARG_TYPES;

export function ThreeColumns() {
  return (
    <Footer
      BottomLink={BottomLink}
      bottomLinks={bottomLinks}
      col1={col}
      col2={col}
      companyName="Kienle Holdings, LLC"
      logo={logo}
    />
  );
}

ThreeColumns.args = ARGS;
ThreeColumns.argTypes = ARG_TYPES;

export function TwoColumns(props: FooterProps) {
  return (
    <Footer {...props} BottomLink={BottomLink} bottomLinks={bottomLinks} col1={col} logo={logo} />
  );
}

TwoColumns.args = ARGS;
TwoColumns.argTypes = ARG_TYPES;

export function OneColumn(props: FooterProps) {
  return (
    <Footer
      {...props}
      BottomLink={BottomLink}
      bottomLinks={[
        {
          display: 'Item 1',
          value: 'item1',
        },
        {
          display: 'Item 2',
          value: 'item2',
        },
      ]}
      logo={logo}
    />
  );
}

OneColumn.args = ARGS;
OneColumn.argTypes = ARG_TYPES;
