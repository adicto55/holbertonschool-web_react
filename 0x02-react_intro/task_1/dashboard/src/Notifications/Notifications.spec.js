import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  beforeEach(() => {
    render(<Notifications />);
  });

  test('renders the notifications title', () => {
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test('renders the close button', () => {
    expect(
      screen.getByRole('button', { name: /close/i }),
    ).toBeInTheDocument();
  });

  test('renders three notifications', () => {
    const notifications = screen.getAllByRole('listitem');

    expect(notifications).toHaveLength(3);
  });

  test('logs a message when the close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const closeButton = screen.getByRole('button', {
      name: /close/i,
    });

    fireEvent.click(closeButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked',
    );

    consoleSpy.mockRestore();
  });
});