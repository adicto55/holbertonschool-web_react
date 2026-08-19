import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders 2 labels, 2 inputs and 1 button', () => {
    render(<Login />);

    expect(document.querySelectorAll('label')).toHaveLength(2);
    expect(document.querySelectorAll('input')).toHaveLength(2);
    expect(document.querySelectorAll('button')).toHaveLength(1);
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