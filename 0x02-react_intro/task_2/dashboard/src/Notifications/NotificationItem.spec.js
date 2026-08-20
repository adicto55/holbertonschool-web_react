import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders default notification with blue color', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
      />
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveStyle('color: blue');
    expect(item).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders urgent notification with red color', () => {
    render(
      <NotificationItem
        type="urgent"
        value="New resume available"
      />
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveStyle('color: red');
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
  });
});