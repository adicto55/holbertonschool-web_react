import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders the Holberton logo', () => {
    const { container } = render(<Header />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image.alt).toBe('holberton logo');
  });

  test('renders the correct heading', () => {
    const { container } = render(<Header />);

    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('School dashboard');
  });
});