// TODO: The UX here kinda sucks, we should refactor this component (and build a cursor option)
import { useMemo } from 'react';

import Typography from 'components/Typography';
import type { ClassName } from 'types';
import { computeClassName, focus } from 'utils/commonClassNames';

export interface PaginationProps {
  /**
   * The current page
   */
  activePage: number;
  /**
   * Will add or override tailwind classes
   */
  classNames?: {
    activeButton?: ClassName;
    inactiveButton?: ClassName;
    spacer?: ClassName;
    wrapper?: ClassName;
  };
  /**
   * Function that runs when a user clicks on a pagination button
   */
  // The below is a false positive: ts definitions don't care about unused vars
  // eslint-disable-next-line no-unused-vars
  onClick: (value: number) => void;
  /**
   * The total number of pages to paginate through
   */
  totalPages: number;
}

// TODO: In the future we should make this changeable with a prop
const COMMON_BUTTON_CLASSNAMES = 'px-8 ml-8 rounded shadow-level-2 hover:shadow-level-3';

/**
 * Page navigation for large datasets
 */
export function Pagination({ activePage, classNames, onClick, totalPages }: PaginationProps) {
  const computedClassNames = useMemo(
    () => ({
      activeButton: computeClassName(
        [focus, COMMON_BUTTON_CLASSNAMES, 'bg-primary', 'text-primary-type'],
        classNames?.activeButton
      ),
      inactiveButton: computeClassName(
        [
          focus,
          COMMON_BUTTON_CLASSNAMES,
          'bg-white',
          'dark:bg-black',
          'text-black',
          'dark:text-white',
          'disabled:cursor-not-allowed',
          'disabled:shadow-level-1',
        ],
        classNames?.inactiveButton
      ),
      spacer: computeClassName(
        ['text-black', 'dark:text-white', 'px-8', 'ml-8'],
        classNames?.spacer
      ),
      wrapper: computeClassName(['-ml-8'], classNames?.wrapper),
    }),
    [classNames]
  );

  const pages = useMemo(() => {
    const pageArray: number[] = [];
    for (let currentPage = 1; currentPage < totalPages + 1; currentPage += 1) {
      pageArray.push(currentPage);
    }

    return pageArray.map((page) => {
      if (
        totalPages > 5 &&
        ![1, totalPages, activePage, activePage + 1, activePage - 1].includes(page)
      ) {
        if (page > activePage + 2 || page < activePage - 2) {
          return null;
        }
        return (
          <span aria-hidden="true" className={computedClassNames.spacer} key={page}>
            <Typography type="body" variant="span">
              ...
            </Typography>
          </span>
        );
      }
      return (
        <li className="inline-block" key={page}>
          <button
            aria-label={activePage === page ? `Current Page, Page ${page}` : `Goto Page ${page}`}
            aria-current={activePage === page}
            className={
              activePage === page
                ? computedClassNames.activeButton
                : computedClassNames.inactiveButton
            }
            onClick={() => onClick(page)}
            type="button"
          >
            <Typography classNames={{ wrapper: 'text-inherit' }} type="body" variant="span">
              {page}
            </Typography>
          </button>
        </li>
      );
    });
  }, [activePage, computedClassNames, onClick, totalPages]);

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className={computedClassNames.wrapper}>
        <li className="inline-block">
          <button
            className={computedClassNames.inactiveButton}
            disabled={activePage === 1}
            onClick={() => onClick(activePage - 1)}
            type="button"
          >
            Previous
          </button>
        </li>
        {pages}
        <li className="inline-block">
          <button
            className={computedClassNames.inactiveButton}
            disabled={activePage === totalPages}
            onClick={() => onClick(activePage + 1)}
            type="button"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
