import { useMemo } from 'react';
import type { HTMLProps, ReactNode } from 'react';
import type { ClassName, Customization } from 'types';
import { bodyFont, computeClassName, customizeTopLevel, headingFont } from 'utils/commonClassNames';

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

export type TypographyType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'body-lg'
  | 'body-xl';

interface CommonProps {
  /**
   * Sets the font weight to bold - does nothing for headings
   */
  bold?: boolean;
  /**
   * Will add or override tailwind classes
   */
  custom?: {
    el?: ClassName;
  };
  children?: ReactNode;
  /**
   * Sets the font style to italic
   */
  italic?: boolean;
  /**
   * Adds a 16px margin below the element to simulate a break between paragraphs
   */
  paragraphSpacing?: boolean;
  /**
   * Sets the type of typography to display. This will change the font size and weight
   */
  type?: TypographyType;
}

export const buildTypeStyles = ({
  bold = false,
  className = '',
  custom,
  italic = false,
  paragraphSpacing = false,
  type,
}: {
  bold?: boolean;
  className?: string;
  custom?: { el?: Customization };
  italic?: boolean;
  paragraphSpacing?: boolean;
  type: TypographyType;
}) => {
  if (type.includes('h') && bold) {
    // eslint-disable-next-line no-console
    console.warn('Zephyr Warning: Setting bold to true on a heading component will do nothing');
  }
  return customizeTopLevel(
    [
      'text-fg-light dark:text-fg-dark',
      {
        'font-bold': bold && !type.includes('h'),
        'font-body': !type.includes('h'),
        'font-extrabold': type.includes('h'),
        'font-heading': type.includes('h'),
        'font-normal': !bold && !type.includes('h'),
        italic,
        'mb-16': paragraphSpacing,
        'md:text-body-desktop': type === 'body',
        'md:text-body-lg-desktop': type === 'body-lg',
        'md:text-body-sm-desktop': type === 'body-sm',
        'md:text-body-xl-desktop': type === 'body-xl',
        'md:text-h1-desktop': type === 'h1',
        'md:text-h2-desktop': type === 'h2',
        'md:text-h3-desktop': type === 'h3',
        'md:text-h4-desktop': type === 'h4',
        'md:text-h5-desktop': type === 'h5',
        'md:text-h6-desktop': type === 'h6',
        'text-body-mobile': type === 'body',
        'text-body-lg-mobile': type === 'body-lg',
        'text-body-sm-mobile': type === 'body-sm',
        'text-body-xl-mobile': type === 'body-xl',
        'text-h1-mobile': type === 'h1',
        'text-h2-mobile': type === 'h2',
        'text-h3-mobile': type === 'h3',
        'text-h4-mobile': type === 'h4',
        'text-h5-mobile': type === 'h5',
        'text-h6-mobile': type === 'h6',
      },
    ],
    className,
    custom?.el
  );
};

type HeadingProps = CommonProps & HTMLProps<HTMLHeadingElement>;

export function H1({
  bold,
  className,
  custom,
  children,
  italic,
  paragraphSpacing = true,
  type = 'h1',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({ bold, className, custom, italic, paragraphSpacing, type });
  return (
    <h1 {...props} className={classNames}>
      {children}
    </h1>
  );
}

export function H2({
  bold,
  className,
  custom,
  children,
  italic,
  paragraphSpacing = true,
  type = 'h2',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({ bold, className, custom, italic, paragraphSpacing, type });
  return (
    <h2 {...props} className={classNames}>
      {children}
    </h2>
  );
}

type PProps = CommonProps & HTMLProps<HTMLParagraphElement>;

export function P({
  bold,
  className,
  custom,
  children,
  italic,
  paragraphSpacing = true,
  type = 'body',
  ...props
}: PProps) {
  const classNames = buildTypeStyles({ bold, className, custom, italic, paragraphSpacing, type });
  return (
    <p {...props} className={classNames}>
      {children}
    </p>
  );
}

type SpanProps = CommonProps & HTMLProps<HTMLSpanElement>;

export function Span({
  bold,
  className,
  custom,
  children,
  italic,
  paragraphSpacing,
  type = 'body',
  ...props
}: SpanProps) {
  const classNames = buildTypeStyles({ bold, className, custom, italic, paragraphSpacing, type });
  return (
    <span {...props} className={classNames}>
      {children}
    </span>
  );
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
