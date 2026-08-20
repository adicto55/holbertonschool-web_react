import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('contains the Holberton logo', () => {
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('contains the correct heading', () => {
    const heading = screen.getByRole('heading', {
      name: /school dashboard/i,
    });

    expect(heading).toBeInTheDocument();
  });
});