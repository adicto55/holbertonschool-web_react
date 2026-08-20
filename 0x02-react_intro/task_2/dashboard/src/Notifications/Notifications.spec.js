import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the three notifications', () => {
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
        html: {
          __html: '<strong>Urgent requirement</strong> - complete by EOD',
        },
      },
    ];

    render(<Notifications notifications={notifications} />);

    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent('New course available');
    expect(items[1]).toHaveTextContent('New resume available');
    expect(items[2]).toHaveTextContent('Urgent requirement');
    expect(items[2]).toHaveTextContent('complete by EOD');

    expect(items[0]).toHaveStyle('color: blue');
    expect(items[1]).toHaveStyle('color: red');
    expect(items[2]).toHaveStyle('color: red');
  });
});