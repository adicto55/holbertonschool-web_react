import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the three notifications', () => {
    render(<Notifications />);

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(
      screen.getByText(/Urgent requirement for this project/i)
    ).toBeInTheDocument();
  });
});