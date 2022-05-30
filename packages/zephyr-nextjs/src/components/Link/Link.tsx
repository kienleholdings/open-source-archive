import { buildBaseButtonStyles, linkStyles, utils } from '@kienleholdings/zephyr-react';
import type { ButtonProps } from '@kienleholdings/zephyr-react';
import NextLink from 'next/link';

export interface LinkProps
  extends Omit<ButtonProps, 'htmlType' | 'classNames' | 'loading' | 'onClick' | 'type'> {
  button?: boolean;
  className?: string;
  href: string;
  type?: ButtonProps['type'];
}

function Link({
  block = false,
  button = false,
  children,
  className,
  href,
  type = 'primary',
}: LinkProps) {
  if (button) {
    return (
      <NextLink href={href}>
        {/* This rule doesn't matter here, next passes the href down via a forward ref */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={utils.commonClassNameUtils.computeClassName(
            buildBaseButtonStyles(block, false, type),
            className
          )}
        >
          {children}
        </a>
      </NextLink>
    );
  }
  return (
    <NextLink href={href}>
      {/* This rule doesn't matter here, next passes the href down via a forward ref */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={utils.commonClassNameUtils.computeClassName(linkStyles, className)}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
