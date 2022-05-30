import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';

import Navbar from './Navbar';

export function Default() {
  const [active, setActive] = useState('item1');

  interface NavItemprops {
    children: ReactNode;
    className: string;
    href: string;
    setMenuClose: () => void;
  }

  const NavItem = useCallback(
    ({ children, className, href, setMenuClose }: NavItemprops) => (
      <button
        className={className}
        onClick={() => {
          setActive(href);
          setMenuClose();
        }}
        type="button"
      >
        {children}
      </button>
    ),
    []
  );
  return (
    <Navbar
      activeMenuItem={active}
      logo={<div className="bg-black h-64 w-256" />}
      MenuItem={NavItem as any}
      menuItems={[
        {
          display: 'Item 1',
          value: 'item1',
        },
        {
          display: 'Item 2',
          value: 'item2',
        },
      ]}
    />
  );
}
