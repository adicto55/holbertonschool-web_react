import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';

const mockStore = configureStore([]);

describe('<Notifications />', () => {
  let store;

  beforeAll(() => {
    // Crucial for Aphrodite to work smoothly in testing environments
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    store = mockStore({
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' }
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders the component without crashing', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });

  it('toggles the notification items via the Aphrodite visible class', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const menuItem = screen.getByText('Your notifications');
    
    // Find the wrapper using text that belongs to it
    const listText = screen.getByText('Here is the list of notifications');
    const drawerContainer = listText.closest('div');

    // 1. Initial State Check (should not have the extra visible class)
    const initialClassCount = drawerContainer.classList.length;

    // 2. Open Drawer
    fireEvent.click(menuItem);
    
    // The class count should increase because the dynamically generated `visible` class was added
    expect(drawerContainer.classList.length).toBeGreaterThan(initialClassCount);

    // 3. Close Drawer
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    // The class is toggled off, count drops back to normal
    expect(drawerContainer.classList.length).toEqual(initialClassCount);
  });
});
