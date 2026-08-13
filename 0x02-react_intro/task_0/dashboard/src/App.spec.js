import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the h1 with the correct text', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /school dashboard/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('renders the correct paragraph text', () => {
    render(<App />);

    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/copyright .* - holberton school/i),
    ).toBeInTheDocument();
  });

  test('renders the Holberton logo', () => {
    render(<App />);

    const logo = screen.getByAltText(/holberton logo/i);

    expect(logo).toBeInTheDocument();
  });
});