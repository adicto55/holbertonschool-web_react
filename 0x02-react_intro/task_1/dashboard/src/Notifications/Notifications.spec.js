import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications button', () => {
    render(<Notifications />);

    expect(
      screen.getByRole('button', { name: 'Close' })
    ).toBeInTheDocument();
  });

  test('renders the three notifications', () => {
    render(<Notifications />);

    const notifications = screen.getAllByRole('listitem');

    expect(notifications).toHaveLength(3);

    expect(notifications[0]).toHaveTextContent('New course available');
    expect(notifications[1]).toHaveTextContent('New resume available');
    expect(notifications[2]).toHaveTextContent('Urgent requirement');
    expect(notifications[2]).toHaveTextContent('complete by EOD');
  });
});