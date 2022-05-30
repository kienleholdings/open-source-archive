import { Footer as ZephyrFooter } from '@kienleholdings/zephyr-react';
import type { FooterProps as ZephyrFooterProps } from '@kienleholdings/zephyr-react';

import NavItem from 'components/NavItem';

export type FooterProps = Omit<ZephyrFooterProps, 'BottomLink'>;

function Navbar({
  bottomLinks,
  classNames,
  col1,
  col2,
  col3,
  companyName,
  containerSize,
  logo,
}: FooterProps) {
  return (
    <ZephyrFooter
      BottomLink={NavItem}
      bottomLinks={bottomLinks}
      classNames={classNames}
      col1={col1}
      col2={col2}
      col3={col3}
      companyName={companyName}
      containerSize={containerSize}
      logo={logo}
    />
  );
}

export default Navbar;
