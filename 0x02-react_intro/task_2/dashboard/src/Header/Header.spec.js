import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders the Holberton logo', () => {
    render(<Header />);

    expect(screen.getByAltText('holberton logo')).toBeInTheDocument();
  });

  test('renders the heading with the correct text', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('School dashboard');
  });
});