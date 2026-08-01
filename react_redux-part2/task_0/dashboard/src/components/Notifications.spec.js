import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils, css } from 'aphrodite';
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

  it('drawer visibility is toggled when handleToggleDrawer is fired via click', () => {
    // We use mount here because shallow doesn't create real DOM elements for useRef
    const wrapper = mount(<Notifications />);
    
    // Find the menu item
    const menuItem = wrapper.find('.menuItem');
    const drawer = wrapper.find('.Notifications').getDOMNode();

    // Check initial state (should not contain visible class string)
    expect(drawer.className).not.toMatch(/visible/);

    // Simulate clicking menu item
    menuItem.simulate('click');
    expect(drawer.className).toMatch(/visible/);

    // Find close button and click it
    const closeBtn = wrapper.find('#closeNotifications');
    closeBtn.simulate('click');
    expect(drawer.className).not.toMatch(/visible/);

    wrapper.unmount();
  });
});
