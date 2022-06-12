import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from './index.page';

describe('pages', () => {
  describe('Home', () => {
    it('should render a h1 that says "Welcome!"', () => {
      render(<Home />);
      const main = within(screen.getByRole('main'));
      expect(main.getByRole('heading', { level: 1, name: /Welcome!/i })).toBeDefined();
    });
  });
});
