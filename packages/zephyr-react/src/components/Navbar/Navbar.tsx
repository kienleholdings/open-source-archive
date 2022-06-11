import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import type { ComponentType, HTMLProps, ReactNode } from 'react';

import Container from 'components/Container';
import type { ContainerSizes } from 'components/Container';
import Icon from 'components/Icon';
import { Span } from 'components/Typography';
import type { Customization, DisplayValueObject } from 'types';
import { customize, customizeTopLevel, focus, hoverAnimation } from 'utils/commonClassNames';

export interface NavbarProps extends Omit<HTMLProps<HTMLElement>, 'size'> {
  /**
   * The background color of the navbar and its associated menu items
   */
  color?: 'solid' | 'transparent';
  /**
   * The size of the container that wraps the Navbar. Should match what you're using in the content for the best UX
   */
  containerSize?: ContainerSizes;
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    container?: Customization;
    el?: Customization;
    hamburger?: Customization;
    hamburgerContainer?: Customization;
    leftContent?: Customization;
    list?: Customization;
    listContainer?: Customization;
    listItem?: Customization;
    listMobile?: Customization;
    mobileOverlay?: Customization;
    rightContent?: Customization;
  };
  /**
   * Replaces the default hyperlink with a custom component such as a React Router Link
   */
  CustomNavItem?: ComponentType<HTMLProps<HTMLAnchorElement>>;
  /**
   * Causes the navbar to stick to the top of the screen. Creates an empty div with margin at the top of the page
   */
  sticky?: boolean;
  /**
   * Additional content appearing on the left side of the navbar
   */
  leftContent?: ReactNode;
  /**
   * A DisplayValueObject where the display is shown in the menu item and the value is the URL to navigate to
   */
  menuItems?: DisplayValueObject[];
  /**
   * Additional content appearing on the right side of the navbar
   */
  rightContent?: ReactNode;
  /**
   * Changes the navbar vertical's padding
   */
  size?: 'compact' | 'default';
}

export const buildNavbarStyles = ({
  className = '',
  color = 'solid',
  custom,
  menuOpen = false,
  size = 'default',
  sticky = false,
}: {
  className?: string;
  color?: NavbarProps['color'];
  custom?: NavbarProps['custom'];
  menuOpen?: boolean;
  size?: NavbarProps['size'];
  sticky?: boolean;
}) => ({
  container: customize('flex h-full', custom?.container),
  el: customizeTopLevel(
    [
      'duration-75 ease-in-out h-72 flex items-center transition w-full',
      hoverAnimation,
      {
        'bg-raised-light': color === 'solid',
        'dark:bg-raised-dark': color === 'solid',
        'shadow-level-4': color === 'solid',
        fixed: sticky,
      },
    ],
    className,
    custom?.el
  ),
  hamburger: customize(hoverAnimation, custom?.hamburger),
  hamburgerContainer: customize(
    [
      focus,
      'block md:hidden px-16',
      { 'py-8': size === 'compact', 'py-24': size === 'default', 'text-primary-dark': menuOpen },
    ],
    custom?.hamburgerContainer
  ),
  leftContent: customize(
    ['mr-48', { 'mt-8': size === 'compact', 'mt-16': size === 'default' }],
    custom?.leftContent
  ),
  list: customize('hidden md:flex w-full', custom?.list),
  listContainer: customize('flex-grow h-full w-full', custom?.listContainer),
  listItem: customize(
    [
      focus,
      'block border-b border-b-raised-border-light dark:border-b-raised-border-dark group hover:text-primary-dark md:border-b-0 px-16',
      { 'py-8': size === 'compact', 'py-24': size === 'default' },
    ],
    custom?.listItem
  ),
  listMobile: customize('flex flex-col h-full', custom?.listMobile),
  mobileOverlay: customize(
    [
      'bg-raised-light dark:bg-raised-dark flex fixed items-center justify-center md:hidden overflow-hidden w-screen z-50',
      hoverAnimation,
    ],
    custom?.mobileOverlay
  ),
  rightContent: customize('mr-16 md:mr-0', custom?.rightContent),
});

export function DefaultNavItem({ children, ...props }: HTMLProps<HTMLAnchorElement>) {
  return (
    <a {...props}>
      <Span className={clsx('group-hover:text-primary-dark', hoverAnimation)}>{children}</Span>
    </a>
  );
}

/**
 * A main navigation bar for web applications
 */
export function Navbar({
  className,
  color = 'solid',
  containerSize = 'four-column',
  custom,
  CustomNavItem = DefaultNavItem,
  leftContent = null,
  menuItems = [],
  rightContent = null,
  size,
  sticky = false,
  ...props
}: NavbarProps) {
  const [transitionToSolid, setTransitionToSolid] = useState(color === 'solid');
  useEffect(() => {
    const changeNavbarColor = () => {
      if (color === 'transparent') {
        if (window.scrollY >= 32) {
          setTransitionToSolid(true);
        } else {
          setTransitionToSolid(false);
        }
      }
    };
    changeNavbarColor();
    window.addEventListener('scroll', changeNavbarColor);
    return () => {
      window.removeEventListener('scroll', changeNavbarColor);
    };
  }, [color]);

  // This menu will only ever be visible on small screens
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = useMemo(
    () =>
      buildNavbarStyles({
        className,
        color: transitionToSolid || menuOpen ? 'solid' : 'transparent',
        custom,
        size,
        sticky,
      }),
    [className, custom, menuOpen, size, sticky, transitionToSolid]
  );

  return (
    <div className="relative">
      <header {...props} className={styles.el}>
        <Container className={styles.container} size={containerSize}>
          {!!leftContent && <div className={styles.leftContent}>{leftContent}</div>}
          <nav aria-label="Site Navigation" className={styles.listContainer}>
            <ul className={styles.list}>
              {menuItems.map((item) => (
                <li>
                  <CustomNavItem
                    className={styles.listItem}
                    href={item.value}
                    key={item.value}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.display}
                  </CustomNavItem>
                </li>
              ))}
            </ul>
          </nav>
          {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
          {!!menuItems.length && (
            <button
              aria-label={menuOpen ? 'Open Navigation Menu' : 'Close Navigation Menu'}
              className={styles.hamburgerContainer}
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              <Span className={styles.hamburger}>
                <Icon icon={menuOpen ? 'times' : 'bars'} />
              </Span>
            </button>
          )}
        </Container>
      </header>
      {sticky && <div className="h-72" />}
      <div
        className={styles.mobileOverlay}
        style={{ height: menuOpen ? 'calc(100vh - 72px)' : '0px' }}
      >
        <nav aria-hidden className={styles.listContainer}>
          <ul className={styles.listMobile}>
            {menuItems.map((item) => (
              <li>
                <CustomNavItem
                  className={styles.listItem}
                  href={item.value}
                  key={item.value}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.display}
                </CustomNavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
