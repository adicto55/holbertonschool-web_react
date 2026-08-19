import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders the copyright with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(
        `Copyright ${currentYear} - Holberton School`
      )
    ).toBeInTheDocument();
  });
});