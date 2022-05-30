import { useMemo } from 'react';
import type { ComponentType } from 'react';

import Typography from 'components/Typography';
import type { ClassName, DisplayValueObject } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

export const spacer = (
  <Typography classNames={{ wrapper: 'px-8 no-underline' }} type="body" variant="span">
    /
  </Typography>
);

export interface LinkElProps {
  active?: boolean;
  className: string;
  includeSpacer?: boolean;
  item: DisplayValueObject;
  onClick?: (value: string) => void;
  stateClassName: string;
}

export function BaseLinkEl({
  active,
  className,
  includeSpacer = false,
  item,
  onClick,
  stateClassName,
}: LinkElProps) {
  return (
    <div className={className}>
      {includeSpacer && spacer}
      <button className={stateClassName} onClick={() => onClick?.(item.value)} type="button">
        <Typography type={active ? 'body-bold' : 'body'} variant="span">
          {item.display}
        </Typography>
      </button>
    </div>
  );
}

export interface BreadcrumbsProps {
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    active?: ClassName;
    collapsedButton?: ClassName;
    item?: ClassName;
    wrapper?: ClassName;
  };
  LinkEl?: ComponentType<LinkElProps>;
  /**
   * Sets the type of badge to display. This will change the background and text colors
   */
  items: DisplayValueObject[];
  /**
   * The callback action for when a breadcrumb item is clicked (will do nothing for the last item)
   */
  onClick: (value: string) => void;
}

const commonBreadcrumbClassNames = 'flex text-black';

/**
 * Provides a top-level, hierarchical navigation menu for users
 */
export function Breadcrumbs({ classNames, items, LinkEl = BaseLinkEl, onClick }: BreadcrumbsProps) {
  const computedClassNames = useMemo(
    () => ({
      active: computeClassName([commonBreadcrumbClassNames, 'font-bold'], classNames?.active),
      collapsedButton: computeClassName([commonBreadcrumbClassNames], classNames?.collapsedButton),
      item: computeClassName([commonBreadcrumbClassNames], classNames?.item),
      wrapper: computeClassName(['flex', 'inline-block', 'px-8', 'rounded'], classNames?.wrapper),
    }),
    [classNames]
  );

  // Breadcrumbs should be hidden when there aren't at least two items, it doesn't make sense to show them if they're empty or only have a top-level item
  if (!items.length || items.length <= 1) {
    return null;
  }

  return (
    <div className={computedClassNames.wrapper}>
      {items.map((item, index) => {
        if (index === 0) {
          return (
            <LinkEl
              className={computedClassNames.item}
              item={item}
              key={item.value}
              onClick={onClick}
              stateClassName={`${focus} hover:underline`}
            />
          );
        }
        if (index === items.length - 1) {
          return (
            <LinkEl
              active
              className={computedClassNames.active}
              includeSpacer
              item={item}
              key={item.value}
              onClick={onClick}
              stateClassName={`${focus} body-bold`}
            />
          );
        }
        if (items.length > 3) {
          return (
            <LinkEl
              className={computedClassNames.collapsedButton}
              includeSpacer
              item={{ display: '...', value: item.value }}
              key={item.value}
              onClick={onClick}
              stateClassName={`${focus} hover:underline`}
            />
          );
        }
        return (
          <LinkEl
            className={computedClassNames.item}
            includeSpacer
            item={item}
            key={item.value}
            onClick={onClick}
            stateClassName={`${focus} hover:underline`}
          />
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
