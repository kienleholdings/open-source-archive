import classNames, { Argument } from 'classnames';
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { Customization, ClassName } from '../types';

export const bodyFont = 'font-body leading-body';
export const headingFont = 'font-display font-black';
export const focus = 'focus:outline-none focus-visible:ring focus-visible:accent';
export const focusNoSelector = 'outline-none ring accent';
export const hoverAnimation = 'duration-200 ease-in-out transition-all';

export const computeClassName = (
  componentClassNames: Argument[],
  additionalClassNames?: ClassName
): string => {
  if (typeof additionalClassNames === 'object' && additionalClassNames.overrides) {
    return classNames(...componentClassNames, ...additionalClassNames.overrides);
  }
  if (typeof additionalClassNames === 'string') {
    return classNames(...[...componentClassNames, additionalClassNames]);
  }
  return classNames(componentClassNames);
};

export const customize = (
  initialClassNames: ClassValue | ClassValue[],
  customizations: Customization = []
) => {
  if (
    Array.isArray(customizations) &&
    customizations.length > 1 &&
    customizations[customizations.length - 1] === true
  ) {
    return clsx(customizations);
  }
  return clsx(initialClassNames, customizations);
};

export const customizeTopLevel = (
  initialClassNames: ClassValue | ClassValue[],
  className = '',
  customizations: Customization = []
) => {
  if (className?.length) {
    return clsx(initialClassNames, className);
  }
  return clsx(initialClassNames, customizations);
};

// For exposing at the app top-level
export default { bodyFont, headingFont, focus, focusNoSelector, hoverAnimation, computeClassName };
