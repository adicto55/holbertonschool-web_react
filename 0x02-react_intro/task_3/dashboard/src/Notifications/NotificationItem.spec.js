import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders default notification correctly', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
      />
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveAttribute('data-notification-type', 'default');
    expect(item).toHaveStyle('color: blue');
    expect(item).toHaveTextContent('New course available');
  });

  test('renders urgent notification correctly', () => {
    render(
      <NotificationItem
        type="urgent"
        value="New resume available"
      />
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveAttribute('data-notification-type', 'urgent');
    expect(item).toHaveStyle('color: red');
    expect(item).toHaveTextContent('New resume available');
  });
});