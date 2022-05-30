import { Navbar as ZephyrNavbar } from '@kienleholdings/zephyr-react';
import type { NavbarProps as ZephyrNavbarProps } from '@kienleholdings/zephyr-react';

import NavItem from 'components/NavItem';

export type NavbarProps = Omit<ZephyrNavbarProps, 'MenuItem'>;

function Navbar({ activeMenuItem, containerSize, logo, menuItems }: NavbarProps) {
  return (
    <ZephyrNavbar
      activeMenuItem={activeMenuItem}
      containerSize={containerSize}
      logo={logo}
      MenuItem={NavItem}
      menuItems={menuItems}
    />
  );
}

export default Navbar;
