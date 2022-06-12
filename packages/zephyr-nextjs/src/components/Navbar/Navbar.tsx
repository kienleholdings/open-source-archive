import { Navbar as ZephyrNavbar } from '@kienleholdings/zephyr-react';
import type { NavbarProps as ZephyrNavbarProps } from '@kienleholdings/zephyr-react';

export type NavbarProps = Omit<ZephyrNavbarProps, 'MenuItem'>;

function Navbar({ containerSize, leftContent, menuItems }: NavbarProps) {
  return (
    <ZephyrNavbar containerSize={containerSize} leftContent={leftContent} menuItems={menuItems} />
  );
}

export default Navbar;
