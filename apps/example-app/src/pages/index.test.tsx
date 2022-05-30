import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from './index.page';

describe('pages', () => {
  describe('Home', () => {
    it('should render a h1 that says "welcome to next.js"', () => {
      render(<Home />);
      const main = within(screen.getByRole('main'));
      expect(main.getByRole('heading', { level: 1, name: /welcome to next\.js!/i })).toBeDefined();

      const footer = within(screen.getByRole('contentinfo'));
      const link = within(footer.getByRole('link'));
      expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined();
    });
  });
});
