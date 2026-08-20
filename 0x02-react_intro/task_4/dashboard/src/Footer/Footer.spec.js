import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear } from '../utils/utils';

describe('Footer component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders the correct copyright text', () => {
    const currentYear = getCurrentYear();

    const footerText = screen.getByText(
      `Copyright ${currentYear} - Holberton School`,
    );

    expect(footerText).toBeInTheDocument();
  });
});