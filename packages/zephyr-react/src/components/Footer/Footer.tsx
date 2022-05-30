import { useMemo } from 'react';
import type { ComponentType, ReactNode } from 'react';

import Container from 'components/Container';
import type { ContainerSizes } from 'components/Container';
import Typography from 'components/Typography';
import type { ClassName, DisplayValueObject } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

interface BottomLinkProps {
  children: ReactNode;
  className: string;
  href: string;
}

export interface FooterProps {
  /**
   * The React component used to display nav items. Should have "className", "children", and "href" props available (see example in Footer.md for usage)
   */
  BottomLink?: ComponentType<BottomLinkProps>;
  /**
   * A DisplayValueObject where the display is shown in the bottom link and the value is the URL to navigate to
   */
  bottomLinks?: DisplayValueObject[];
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    bottomLink?: ClassName;
    bottomLinkList?: ClassName;
    bottomLinkWithPadding?: ClassName;
    bottomRow?: ClassName;
    bottomRowWrapper?: ClassName;
    column?: ClassName;
    copyright?: ClassName;
    logoColumn?: ClassName;
    logo?: ClassName;
    topRow?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * A react element used as column 1 in the 3 available navigation columns
   */
  col1?: ReactNode;
  /**
   * A react element used as column 2 in the 3 available navigation columns
   */
  col2?: ReactNode;
  /**
   * A react element used as column 3 in the 3 available navigation columns
   */
  col3?: ReactNode;
  /**
   * A name to show next to the copyright symbol in the bottom of the footer
   */
  companyName?: string;
  /**
   * The size of the container that wraps the Footer. Should match what you're using in the content for the best UX
   */
  containerSize?: ContainerSizes;
  /**
   * A react element used to show branding on the top-left of the Footer
   */
  logo?: ReactNode;
}

/**
 * Provides bottom-level, more complete navigation, as well as copyright and legal information
 */
export function Footer({
  BottomLink,
  bottomLinks,
  classNames,
  col1,
  col2,
  col3,
  companyName,
  containerSize,
  logo,
}: FooterProps) {
  const has4Col = useMemo(
    () => [col1, col2, col3].filter((col) => !!col).length === 3,
    [col1, col2, col3]
  );

  const computedClassNames = useMemo(
    () => ({
      bottomLink: computeClassName([focus, 'hover:underline'], classNames?.bottomLink),
      bottomLinkList: computeClassName(['flex flex-wrap'], classNames?.bottomLink),
      bottomLinkWithPadding: computeClassName(['mr-16'], classNames?.bottomLinkWithPadding),
      bottomRow: computeClassName(['bg-primary-dark flex px-16 py-16'], classNames?.bottomRow),
      bottomRowWrapper: computeClassName(['bg-primary-dark'], classNames?.bottomRow),
      column: computeClassName(
        ['flex-shrink-0', 'md:mb-0', 'md:w-1/4', 'mb-16', 'pr-16', 'w-full'],
        classNames?.column
      ),
      copyright: computeClassName(['text-primary-type', 'flex-grow'], classNames?.copyright),
      logo: computeClassName(['overflow-x-hidden', 'w-full'], classNames?.logo),
      logoColumn: computeClassName(
        [
          'md:mb-0',
          'mb-16',
          'pr-16',
          'w-full',
          'overflow-x-hidden',
          {
            'md:w-1/4': has4Col,
            'flex-grow': !has4Col,
          },
        ],
        classNames?.logoColumn
      ),
      topRow: computeClassName(
        ['flex', 'flex-wrap', 'md:flex-nowrap', 'p-16', '-mb-16', 'md:mb-0', '-mr-16'],
        classNames?.topRow
      ),
      wrapper: computeClassName(['bg-primary', 'text-primary-type'], classNames?.wrapper),
    }),
    [classNames, has4Col]
  );

  return (
    <footer className={computedClassNames.wrapper}>
      <Container size={containerSize}>
        {(logo || col1 || col2 || col3) && (
          <div className={computedClassNames.topRow}>
            <div className={computedClassNames.logoColumn}>
              <div className={computedClassNames.logo}>{logo}</div>
            </div>
            {col1 && <div className={computedClassNames.column}>{col1}</div>}
            {col2 && <div className={computedClassNames.column}>{col2}</div>}
            {col3 && <div className={computedClassNames.column}>{col3}</div>}
          </div>
        )}
      </Container>
      <div className={computedClassNames.bottomRowWrapper}>
        <Container classNames={{ container: computedClassNames.bottomRow }} size={containerSize}>
          <Typography
            classNames={{ wrapper: computedClassNames.copyright }}
            type="body"
            variant="div"
          >
            &copy; {companyName} {new Date().getFullYear()}
          </Typography>
          <nav className={computedClassNames.bottomLinkList}>
            {bottomLinks &&
              BottomLink &&
              bottomLinks.map((link, key) => (
                <BottomLink
                  key={link.value}
                  className={`${computedClassNames.bottomLink} ${
                    key !== bottomLinks.length - 1 ? computedClassNames.bottomLinkWithPadding : ''
                  }`}
                  href={link.value}
                >
                  {link.display}
                </BottomLink>
              ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
