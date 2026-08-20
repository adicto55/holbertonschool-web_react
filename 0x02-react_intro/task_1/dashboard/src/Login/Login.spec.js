import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- Add this
import Login from './Login';
describe('Login component', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('renders 2 labels, 2 inputs and 1 button', () => {
    const labels = screen.getAllByRole('textbox');

    expect(screen.getAllByText(/email/i)).toHaveLength(1);
    expect(screen.getAllByText(/password/i)).toHaveLength(1);
    expect(labels).toHaveLength(2);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('inputs are focused when their labels are clicked', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    fireEvent.click(emailLabel);
    expect(emailInput).toHaveFocus();

    fireEvent.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });
});