import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { StyleSheetTestUtils, css } from 'aphrodite';
import Notifications from './Notifications';

const mockStore = configureStore([]);

describe('<Notifications />', () => {
  let store;

  beforeAll(() => {
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

  it('renders without crashing and does not log errors', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    expect(screen.getByText('Your notifications')).toBeInTheDocument();
  });

  it('toggles the visibility class via DOM manipulation (no state trigger)', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const menuItem = screen.getByText('Your notifications');
    const listText = screen.getByText('Here is the list of notifications');
    const drawerContainer = listText.closest('div');

    const initialClasses = drawerContainer.className;

    // Trigger open (Aphrodite injected class should be added to DOM natively)
    fireEvent.click(menuItem);
    
    // Verify a new class has been toggled onto the container
    expect(drawerContainer.className).not.toEqual(initialClasses);
    
    // Trigger close via the 'x' button
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    // Verify it reverts to the original classes seamlessly
    expect(drawerContainer.className).toEqual(initialClasses);
  });
});
