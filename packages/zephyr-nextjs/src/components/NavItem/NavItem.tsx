import type { MenuItemProps } from '@kienleholdings/zephyr-react';
import Link from 'next/link';

function NavItem({ children, className, href, setMenuClose }: MenuItemProps) {
  return (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <a
        className={className}
        onClick={() => {
          setMenuClose?.();
        }}
      >
        {children}
      </a>
    </Link>
  );
}

export default NavItem;
