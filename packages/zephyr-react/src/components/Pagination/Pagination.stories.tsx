import { useState } from 'react';

import Pagination from './Pagination';
import type { PaginationProps } from './Pagination';

const ARGS = {
  totalPages: 5,
};

export function Default(props: PaginationProps) {
  const [activePage, setActivePage] = useState(1);
  return (
    <>
      I&apos;m on page {activePage}
      <Pagination {...props} activePage={activePage} onClick={setActivePage} />
    </>
  );
}

Default.args = ARGS;
