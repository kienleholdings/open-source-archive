import { useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';

import Container from 'components/Container';
import type { ContainerSizes } from 'components/Container';
import Icon from 'components/Icon';
import type { ClassName, DisplayValueObject, MenuItemProps } from 'types';
import { headingFont, computeClassName, focus } from 'utils/commonClassNames';

export interface NavbarProps {
  /**
   * The currently selected menu item, should match the `.value` of one of the items in menuItems
   */
  activeMenuItem: string;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    desktopMenuItem?: ClassName;
    desktopMenuNav?: ClassName;
    logoWrapper?: ClassName;
    mobileMenuButton?: ClassName;
    mobileMenuItem?: ClassName;
    mobileMenuNav?: ClassName;
    mobileMenuWrapper?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * The size of the container that wraps the Navbar. Should match what you're using in the content for the best UX
   */
  containerSize?: ContainerSizes;
  /**
   * A react element used to show branding on the top-left of the Navbar
   */
  logo: ReactNode;
  /**
   * The React component used to display nav items. Should have "className", "children", "href", and "setMenuClose" props available (see example in Navbar.md for usage)
   */
  MenuItem: ComponentType<MenuItemProps>;
  /**
   * A DisplayValueObject where the display is shown in the menu item and the value is the URL to navigate to
   */
  menuItems: DisplayValueObject[];
}

/**
 * A main navigation bar for web applications
 */
export function Navbar({
  activeMenuItem,
  classNames,
  containerSize = 'four-column',
  logo,
  MenuItem,
  menuItems,
}: NavbarProps) {
  const computedClassNames = useMemo(
    () => ({
      desktopMenuItem: (item: DisplayValueObject) =>
        computeClassName(
          [
            focus,
            {
              'bg-white dark:bg-black': activeMenuItem === item.value,
              'hover:bg-primary-light': activeMenuItem !== item.value,
              'shadow-level-2': activeMenuItem === item.value,
              'text-primary-type': activeMenuItem !== item.value,
              'text-black dark:text-white': activeMenuItem === item.value,
            },
            'flex',
            'items-center',
            'p-16',
            'text-center',
            'text-heading-xs',
          ],
          classNames?.desktopMenuItem
        ),
      desktopMenuNav: computeClassName(['hidden', 'md:flex', '-mr-32'], classNames?.desktopMenuNav),
      logoWrapper: computeClassName(['flex-grow', 'pr-0', 'md:pr-16'], classNames?.logoWrapper),
      mobileMenuButton: computeClassName(
        [
          'block',
          'hover:bg-primary-light',
          'md:hidden',
          'p-16',
          '-mr-16',
          'text-heading-xs',
          'text-primary-type',
        ],
        classNames?.mobileMenuButton
      ),
      mobileMenuItem: (item: DisplayValueObject) =>
        computeClassName(
          [
            focus,
            {
              'bg-white dark:bg-black': activeMenuItem === item.value,
              'hover:bg-primary-light': activeMenuItem !== item.value,
              'shadow-level-2': activeMenuItem === item.value,
              'text-primary-type': activeMenuItem !== item.value,
              'text-black dark:text-white': activeMenuItem === item.value,
            },
            'px-16',
            'py-8',
            'text-heading-sm',
            'text-left',
          ],
          classNames?.mobileMenuItem
        ),
      mobileMenuNav: computeClassName(
        ['absolute', 'bg-primary', 'h-full', 'flex', 'flex-col', 'left-0', 'w-full'],
        classNames?.mobileMenuNav
      ),
      mobileMenuWrapper: computeClassName(
        [
          'md:hidden',
          'relative',
          'flex',
          'h-screen',
          'items-center',
          'justify-center',
          'w-screen',
          'z-50',
        ],
        classNames?.mobileMenuWrapper
      ),
      wrapper: computeClassName([headingFont, 'bg-primary'], classNames?.wrapper),
    }),
    [activeMenuItem, classNames]
  );

  // This menu will only ever be visible on small screens
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={computedClassNames.wrapper}>
        <Container classNames={{ container: 'flex' }} size={containerSize}>
          <div className={computedClassNames.logoWrapper}>{logo}</div>
          {!!menuItems.length && (
            <button
              aria-label={menuOpen ? 'Open Navigation Menu' : 'Close Navigation Menu'}
              className={computedClassNames.mobileMenuButton}
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              <div className="text-center w-16">
                <Icon icon={menuOpen ? 'times' : 'bars'} />
              </div>
            </button>
          )}
          <nav className={computedClassNames.desktopMenuNav}>
            {menuItems.map((item) => (
              <MenuItem
                className={computedClassNames.desktopMenuItem(item)}
                href={item.value}
                key={item.value}
                setMenuClose={() => setMenuOpen(false)}
              >
                {item.display}
              </MenuItem>
            ))}
          </nav>
        </Container>
      </header>
      {menuOpen && (
        <div className={computedClassNames.mobileMenuWrapper}>
          <nav className={computedClassNames.mobileMenuNav}>
            {menuItems.map((item) => (
              <MenuItem
                className={computedClassNames.mobileMenuItem(item)}
                href={item.value}
                key={item.value}
                setMenuClose={() => setMenuOpen(false)}
              >
                {item.display}
              </MenuItem>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
