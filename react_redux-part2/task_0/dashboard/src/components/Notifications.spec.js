import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import Notifications from './Notifications';
import notificationsReducer from '../features/notifications/notificationsSlice';

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );
};

describe('Notifications', () => {
  test('renders the "Your notifications" menu item', () => {
    renderWithStore({
      notifications: { notifications: [], status: 'idle', error: null },
    });
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('renders "No new notification for now" when there are no notifications', () => {
    renderWithStore({
      notifications: { notifications: [], status: 'idle', error: null },
    });
    expect(
      screen.getByText(/no new notification for now/i)
    ).toBeInTheDocument();
  });

  test('renders the list of notifications when present', () => {
    renderWithStore({
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
        ],
        status: 'succeeded',
        error: null,
      },
    });
    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  });

  test('drawer does not have the "visible" class by default', () => {
    renderWithStore({
      notifications: { notifications: [], status: 'idle', error: null },
    });
    const drawer = document.getElementById('Notifications');
    expect(drawer.className).not.toMatch(/visible/);
  });

  test('clicking the menu item toggles the "visible" class on the drawer', () => {
    renderWithStore({
      notifications: { notifications: [], status: 'idle', error: null },
    });
    const drawer = document.getElementById('Notifications');
    const menuItem = screen.getByText(/your notifications/i);

    fireEvent.click(menuItem);
    expect(drawer.className).toMatch(/visible/);

    fireEvent.click(menuItem);
    expect(drawer.className).not.toMatch(/visible/);
  });

  test('clicking the close icon removes the "visible" class', () => {
    renderWithStore({
      notifications: { notifications: [], status: 'idle', error: null },
    });
    const drawer = document.getElementById('Notifications');
    const menuItem = screen.getByText(/your notifications/i);

    fireEvent.click(menuItem);
    expect(drawer.className).toMatch(/visible/);

    const closeIcon = screen.getByAltText(/close/i);
    fireEvent.click(closeIcon);
    expect(drawer.className).not.toMatch(/visible/);
  });

  test('clicking a notification dispatches markNotificationAsRead and removes it', () => {
    renderWithStore({
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
        ],
        status: 'succeeded',
        error: null,
      },
    });
    const item = screen.getByText(/new course available/i);
    fireEvent.click(item);
    expect(
      screen.queryByText(/new course available/i)
    ).not.toBeInTheDocument();
  });
});