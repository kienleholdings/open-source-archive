import classNames, { Argument } from 'classnames';
import { ClassName } from '../types';

export const bodyFont = 'font-body leading-body';
export const headingFont = 'font-display font-black';
export const focus = 'focus:outline-none focus:ring focus:accent';
export const focusNoSelector = 'outline-none ring accent';
export const hoverAnimation = 'duration-200 ease-in-out transition';

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

// For exposing at the app top-level
export default { bodyFont, headingFont, focus, focusNoSelector, hoverAnimation, computeClassName };
