import clsx from 'clsx';
import { useMemo, useState } from 'react';
import type { ComponentType, HTMLProps } from 'react';

import { ChevronDown } from 'components/Icons';
import { Div, Span, Strong } from 'components/Typography';

import { Customization, DisplayValueObject } from 'types';
import { customize, customizeTopLevel, focus, hoverAnimation } from 'utils/commonClassNames';

export interface SidebarNavItemProps extends HTMLProps<HTMLAnchorElement> {
  active: boolean;
  child: boolean;
}

export interface SidebarProps extends HTMLProps<HTMLElement> {
  /**
   * The value of the active menu item, can be a heading or child
   */
  activeItem?: string;
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    el?: Customization;
    list?: Customization;
    listItem?: Customization;
    listItemActive?: Customization;
    listItemChild?: Customization;
    listItemChildActive?: Customization;
    mobileWrapper?: Customization;
  };
  /**
   * Replaces the default hyperlink with a custom component such as a React Router Link
   */
  CustomNavItem?: ComponentType<SidebarNavItemProps>;
  /**
   * A DisplayValueObject where the display is shown in the menu item and the value is the URL to navigate to
   */
  menuItems?: (DisplayValueObject & { items?: DisplayValueObject[] })[];
}

export const buildSidebarStyles = ({
  className,
  custom,
  menuOpen = false,
}: {
  className?: string;
  custom?: SidebarProps['custom'];
  menuOpen?: boolean;
}) => ({
  el: customizeTopLevel(
    'border-b border-raised-border-light border-t md:border-0 dark:border-raised-border-dark flex flex-col fixed left-0 md:left-auto w-full md:w-auto',
    className,
    custom?.el
  ),
  list: customize(
    [
      'bg-raised-light dark:bg-raised-dark duration-75 h-auto md:bg-transparent md:max-h-screen md:pb-0 md:px-0 px-16 overflow-hidden transition-all',
      { 'max-h-0': !menuOpen, 'max-h-screen': menuOpen, 'pb-16': menuOpen },
    ],
    custom?.list
  ),
  listItem: customize([focus, 'block group mb-8 mt-16'], custom?.listItem),
  listItemActive: customize('text-primary dark:text-primary', custom?.listItemActive),
  listItemChild: customize([focus, 'block group my-8 mx-8'], custom?.listItemChild),
  listItemChildActive: customize(
    'border-l-2 border-l-primary dark:text-primary px-8 text-primary',
    custom?.listItemChildActive
  ),
  mobileWrapper: customize(
    [
      focus,
      'bg-raised-light dark:bg-raised-dark flex items-center md:bg-transparent md:hidden px-16 py-8 shadow-level-2 text-left w-full',
    ],
    custom?.mobileWrapper
  ),
});

export function DefaultNavItem({ active, child, children, ...props }: SidebarNavItemProps) {
  const typeClassName = clsx(hoverAnimation, 'group-hover:text-primary-dark', {
    'dark:text-primary text-primary': active,
  });
  return (
    <a {...props}>
      {child ? (
        <Span className={typeClassName}>{children}</Span>
      ) : (
        <Strong className={typeClassName} type="body-lg">
          {children}
        </Strong>
      )}
    </a>
  );
}

function Sidebar({
  activeItem,
  className,
  custom,
  CustomNavItem = DefaultNavItem,
  menuItems = [],
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const styles = useMemo(
    () => buildSidebarStyles({ className, custom, menuOpen }),
    [className, custom, menuOpen]
  );
  return (
    <>
      <nav aria-label="Secondary Navigation" className={styles.el}>
        <button
          aria-label={menuOpen ? 'Open Secondary Navigation' : 'Close Secondary Navigation'}
          className={styles.mobileWrapper}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <Div className="flex-grow">Menu</Div>
          <ChevronDown
            className={clsx('text-fg-light dark:text-fg-dark transition', {
              'rotate-0': !menuOpen,
              'rotate-180': menuOpen,
            })}
          />
        </button>
        <ul className={styles?.list}>
          {menuItems.map((item) => (
            <li key={item.value}>
              <CustomNavItem
                active={activeItem === item.value}
                child={false}
                className={styles.listItem}
                href={item.value}
              >
                {item.display}
              </CustomNavItem>
              {!!item.items?.length && (
                <ul>
                  {item.items.map((subItem) => (
                    <li key={subItem.value}>
                      <CustomNavItem
                        active={activeItem === subItem.value}
                        child
                        className={clsx(styles.listItemChild, {
                          [styles.listItemChildActive]: activeItem === subItem.value,
                        })}
                        href={subItem.value}
                      >
                        {subItem.display}
                      </CustomNavItem>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-40 md:hidden" />
    </>
  );
}

export default Sidebar;
