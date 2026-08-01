import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';

describe('Notifications component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    render(<Notifications notifications={[]} />);
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });

  it('drawer visibility is toggled when handleToggleDrawer is fired', () => {
    render(<Notifications notifications={[]} />);
    
    const menuItem = screen.getByText('Your notifications');
    const closeButton = screen.getByRole('button', { name: /close/i });
    const drawerContainer = closeButton.parentElement;

    expect(drawerContainer.className).not.toMatch(/visible/);

    fireEvent.click(menuItem);
    expect(drawerContainer.className).toMatch(/visible/);

    fireEvent.click(closeButton);
    expect(drawerContainer.className).not.toMatch(/visible/);
  });

  // NEW TESTS FOR TASK 1
  it('displays "Loading..." when the loading prop is true', () => {
    render(<Notifications loading={true} notifications={[]} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  });

  it('displays the notifications text when loading prop is false', () => {
    render(<Notifications loading={false} notifications={[]} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument();
  });
});
