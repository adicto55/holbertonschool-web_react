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
});
