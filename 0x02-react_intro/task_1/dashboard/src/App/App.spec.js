import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders the h1 with the correct text', () => {
    const heading = screen.getByRole('heading', {
      name: /school dashboard/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('renders the correct paragraph text', () => {
    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/copyright .* - holberton school/i),
    ).toBeInTheDocument();
  });

  test('renders the Holberton logo', () => {
    const logo = screen.getByAltText(/holberton logo/i);

    expect(logo).toBeInTheDocument();
  });

  test('renders two input elements', () => {
    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(2);
  });

  test('renders Email and Password labels', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders the OK button', () => {
    const button = screen.getByRole('button', {
      name: /ok/i,
    });

    expect(button).toBeInTheDocument();
  });
}); 