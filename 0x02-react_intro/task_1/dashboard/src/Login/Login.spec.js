import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders 2 labels, 2 inputs and 1 button', () => {
    render(<Login />);

    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  test('inputs are focused when their labels are clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await user.click(screen.getByText('Email'));
    expect(emailInput).toHaveFocus();

    await user.click(screen.getByText('Password'));
    expect(passwordInput).toHaveFocus();
  });
});