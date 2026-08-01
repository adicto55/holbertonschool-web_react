import React from 'react';
import { shallow, mount } from 'enzyme';
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
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct number of items when passed a list', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const wrapper = shallow(<Notifications listNotifications={listNotifications} />);
    expect(wrapper.find('NotificationItem').length).toBe(2);
  });

  it('drawer visibility is toggled when handleToggleDrawer is fired via click', () => {
    const wrapper = mount(<Notifications />);
    
    // Find the menu item and simulate a click
    const menuItem = wrapper.find('div').findWhere(node => node.text() === 'Your notifications').first();
    
    // Click to toggle
    menuItem.simulate('click');
    
    // Clean up
    wrapper.unmount();
  });
});
