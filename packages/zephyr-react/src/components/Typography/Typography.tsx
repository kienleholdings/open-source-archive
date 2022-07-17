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
   * Forces rendering desktop-only font sizes (not recommended)
   */
  desktop?: boolean;
  /**
   * Sets the font style to italic
   */
  italic?: boolean;
  /**
   * Forces rendering mobile-only font sizes (not recommended)
   */
  mobile?: boolean;
  /**
   * Removes responsive color from element, use with caution as this will break dark mode support
   */
  noColor?: boolean;
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
  desktop = false,
  italic = false,
  mobile = false,
  noColor = false,
  paragraphSpacing = false,
  type,
}: {
  bold?: boolean;
  className?: string;
  custom?: { el?: Customization };
  desktop?: boolean;
  italic?: boolean;
  mobile?: boolean;
  noColor?: boolean;
  paragraphSpacing?: boolean;
  type: TypographyType;
}) => {
  if (type.includes('h') && bold) {
    // eslint-disable-next-line no-console
    console.warn('Zephyr Warning: Setting bold to true on a heading component will do nothing');
  }
  return customizeTopLevel(
    [
      {
        'font-bold': bold && !type.includes('h'),
        'font-body': !type.includes('h'),
        'font-extrabold': type.includes('h'),
        'font-heading': type.includes('h'),
        'font-normal': !bold && !type.includes('h'),
        italic,
        'mb-16': paragraphSpacing,
        'md:leading-body-desktop md:text-body-desktop': type === 'body' && !desktop && !mobile,
        'md:leading-body-lg-desktop md:text-body-lg-desktop':
          type === 'body-lg' && !desktop && !mobile,
        'md:leading-body-sm-desktop md:text-body-sm-desktop':
          type === 'body-sm' && !desktop && !mobile,
        'md:leading-body-xl-desktop md:text-body-xl-desktop':
          type === 'body-xl' && !desktop && !mobile,
        'md:leading-h1-desktop md:text-h1-desktop': type === 'h1' && !desktop && !mobile,
        'md:leading-h2-desktop md:text-h2-desktop': type === 'h2' && !desktop && !mobile,
        'md:leading-h3-desktop md:text-h3-desktop': type === 'h3' && !desktop && !mobile,
        'md:leading-h4-desktop md:text-h4-desktop': type === 'h4' && !desktop && !mobile,
        'md:leading-h5-desktop md:text-h5-desktop': type === 'h5' && !desktop && !mobile,
        'md:leading-h6-desktop md:text-h6-desktop': type === 'h6' && !desktop && !mobile,
        'leading-body-desktop text-body-desktop': type === 'body' && !desktop && !mobile,
        'leading-body-lg-desktop text-body-lg-desktop': type === 'body-lg' && desktop,
        'leading-body-sm-desktop text-body-sm-desktop': type === 'body-sm' && desktop,
        'leading-body-xl-desktop text-body-xl-desktop': type === 'body-xl' && desktop,
        'leading-h1-desktop text-h1-desktop': type === 'h1' && desktop,
        'leading-h2-desktop text-h2-desktop': type === 'h2' && desktop,
        'leading-h3-desktop text-h3-desktop': type === 'h3' && desktop,
        'leading-h4-desktop text-h4-desktop': type === 'h4' && desktop,
        'leading-h5-desktop text-h5-desktop': type === 'h5' && desktop,
        'leading-h6-desktop text-h6-desktop': type === 'h6' && desktop,
        'leading-body-mobile text-body-mobile':
          type === 'body' && ((!desktop && !mobile) || mobile),
        'leading-body-lg-mobile text-body-lg-mobile':
          type === 'body-lg' && ((!desktop && !mobile) || mobile),
        'leading-body-sm-mobile text-body-sm-mobile':
          type === 'body-sm' && ((!desktop && !mobile) || mobile),
        'leading-body-xl-mobile text-body-xl-mobile':
          type === 'body-xl' && ((!desktop && !mobile) || mobile),
        'leading-h1-mobile text-h1-mobile': type === 'h1' && ((!desktop && !mobile) || mobile),
        'leading-h2-mobile text-h2-mobile': type === 'h2' && ((!desktop && !mobile) || mobile),
        'leading-h3-mobile text-h3-mobile': type === 'h3' && ((!desktop && !mobile) || mobile),
        'leading-h4-mobile text-h4-mobile': type === 'h4' && ((!desktop && !mobile) || mobile),
        'leading-h5-mobile text-h5-mobile': type === 'h5' && ((!desktop && !mobile) || mobile),
        'leading-h6-mobile text-h6-mobile': type === 'h6' && ((!desktop && !mobile) || mobile),
        'text-fg-light dark:text-fg-dark': !noColor,
      },
    ],
    className,
    custom?.el
  );
};

type DivProps = CommonProps & HTMLProps<HTMLDivElement>;

export function Div({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing,
  type = 'body',
  ...props
}: DivProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
}

type HeadingProps = CommonProps & HTMLProps<HTMLHeadingElement>;

export function H1({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'h1',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
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
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'h2',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <h2 {...props} className={classNames}>
      {children}
    </h2>
  );
}

export function H3({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'h3',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <h3 {...props} className={classNames}>
      {children}
    </h3>
  );
}

export function H4({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'h4',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <h4 {...props} className={classNames}>
      {children}
    </h4>
  );
}

export function H5({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'h5',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <h5 {...props} className={classNames}>
      {children}
    </h5>
  );
}

export function H6({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'h6',
  ...props
}: HeadingProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <h6 {...props} className={classNames}>
      {children}
    </h6>
  );
}

type PProps = CommonProps & HTMLProps<HTMLParagraphElement>;

export function P({
  bold,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = true,
  type = 'body',
  ...props
}: PProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
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
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing,
  type = 'body',
  ...props
}: SpanProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <span {...props} className={classNames}>
      {children}
    </span>
  );
}

type StrongProps = CommonProps & HTMLProps<HTMLElement>;

export function Strong({
  bold = true,
  className,
  custom,
  children,
  desktop = false,
  italic,
  mobile = false,
  noColor = false,
  paragraphSpacing = false,
  type = 'body',
  ...props
}: StrongProps) {
  const classNames = buildTypeStyles({
    bold,
    className,
    custom,
    desktop,
    italic,
    mobile,
    noColor,
    paragraphSpacing,
    type,
  });
  return (
    <strong {...props} className={classNames}>
      {children}
    </strong>
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
