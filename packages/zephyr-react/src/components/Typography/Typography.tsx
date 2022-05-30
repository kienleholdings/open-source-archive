import { useMemo } from 'react';
import type { ReactNode } from 'react';

import type { ClassName } from 'types';
import { bodyFont, computeClassName, headingFont } from 'utils/commonClassNames';

export interface TypographyProps {
  children?: ReactNode;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    wrapper?: ClassName;
  };
  /**
   * Changes the header size at breakpoints to help adapt to smaller screens
   */
  responsiveHeader?: boolean;
  /**
   * Sets the type of typography to display. This will change the font size and weight
   */
  type:
    | 'heading-xxl'
    | 'heading-xl'
    | 'heading-lg'
    | 'heading-md'
    | 'heading-sm'
    | 'heading-xs'
    | 'body'
    | 'body-paragraph'
    | 'body-bold'
    | 'body-italic';
  /**
   * Sets the semantic HTML element to use as the container for the text
   */
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'a' | 'div' | 'span' | 'em' | 'strong';
}

/**
 * Provides highly-visible feedback. This is best used after a user completes a complex action, such as submitting a form
 */
export function Typography({
  children,
  classNames,
  responsiveHeader,
  type,
  variant,
}: TypographyProps) {
  const computedClassNames = useMemo(
    () => ({
      wrapper: computeClassName(
        [
          {
            [bodyFont]: type.includes('body'),
            [headingFont]: type.includes('heading'),
            'font-bold': type === 'body-bold',
            italic: type === 'body-italic',
            'text-heading-xxl': type === 'heading-xxl' && !responsiveHeader,
            'text-heading-xl': type === 'heading-xl' && !responsiveHeader,
            'text-heading-lg': type === 'heading-lg' && !responsiveHeader,
            'text-heading-md': type === 'heading-md' && !responsiveHeader,
            'text-heading-sm': type === 'heading-sm' && !responsiveHeader,
            'text-heading-xs': type === 'heading-xs',
            'lg:text-heading-xxl text-heading-xl': type === 'heading-xxl' && responsiveHeader,
            'lg:text-heading-xl text-heading-lg': type === 'heading-xl' && responsiveHeader,
            'lg:text-heading-lg text-heading-md': type === 'heading-lg' && responsiveHeader,
            'lg:text-heading-md text-heading-sm': type === 'heading-md' && responsiveHeader,
            'lg:text-heading-sm text-heading-xs': type === 'heading-sm' && responsiveHeader,
            'text-body': type.includes('body'),
            'text-black dark:text-white': !computeClassName([], classNames?.wrapper).includes(
              'text-'
            ),
            'mb-16':
              (type.includes('heading') || type === 'body-paragraph') &&
              !computeClassName([], classNames?.wrapper).includes('mb-'),
          },
          'break-words',
        ],
        classNames?.wrapper
      ),
    }),
    [classNames, responsiveHeader, type]
  );

  // JSX is a global typing, however ESLint is dumb about figuring that out
  // eslint-disable-next-line no-undef
  const Variant = variant as keyof JSX.IntrinsicElements;

  return <Variant className={computedClassNames.wrapper}>{children}</Variant>;
}

export default Typography;
