import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

const notifications = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    value: 'Urgent requirement',
    html: {
      __html: '<strong>Urgent requirement</strong> - complete by EOD',
    },
  },
];

describe('Notifications component', () => {
  test('displays notification title in all cases', () => {
    render(<Notifications />);

    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });

  test('does not display drawer when displayDrawer is false', () => {
    render(
      <Notifications
        displayDrawer={false}
        notifications={notifications}
      />
    );

    expect(screen.getByText('Your notifications')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Here is the list of notifications')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('New course available')
    ).not.toBeInTheDocument();
  });

  test('displays drawer when displayDrawer is true', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={notifications}
      />
    );

    expect(screen.getByText('Your notifications')).toBeInTheDocument();

    expect(
      screen.getByText('Here is the list of notifications')
    ).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(
      screen.getByText('New course available')
    ).toBeInTheDocument();

    expect(
      screen.getByText('New resume available')
    ).toBeInTheDocument();
  });

  test('displays no notification message when notifications is empty', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={[]}
      />
    );

    expect(screen.getByText('Your notifications')).toBeInTheDocument();

    expect(
      screen.getByText('Here is the list of notifications')
    ).toBeInTheDocument();

    expect(
      screen.getByText('No new notification for now')
    ).toBeInTheDocument();
  });
});