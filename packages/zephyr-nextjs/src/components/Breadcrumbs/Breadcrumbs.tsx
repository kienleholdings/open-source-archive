import { Breadcrumbs as ZephyrBreadcrumbs, spacer } from '@kienleholdings/zephyr-react';
import type {
  BreadcrumbsProps as ZephyrBreadcrumbsProps,
  LinkElProps,
} from '@kienleholdings/zephyr-react';
import Link from 'next/link';

function Breadcrumb({ className, includeSpacer, item, stateClassName }: LinkElProps) {
  return (
    <div className={className}>
      {includeSpacer && spacer}
      <Link href={item.value}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={`font-body leading-body ${stateClassName}`}>{item.display}</a>
      </Link>
    </div>
  );
}

export type BreadcrumbsProps = Omit<ZephyrBreadcrumbsProps, 'onClick' | 'LinkEl'>;

function Breadcrumbs({ classNames, items }: BreadcrumbsProps) {
  return (
    <ZephyrBreadcrumbs
      classNames={classNames}
      items={items}
      LinkEl={Breadcrumb}
      onClick={() => null}
    />
  );
}

export default Breadcrumbs;
