import { createContext } from 'react';

interface RowContext {
  gutter: boolean;
}

const context = createContext<RowContext>({
  gutter: true,
});

export default context;
