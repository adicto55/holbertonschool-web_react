import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders an img tag (Holberton logo)', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img').exists()).toEqual(true);
  });

  it('renders an h1 tag with the correct text', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').exists()).toEqual(true);
    expect(wrapper.find('h1').text()).toEqual('School dashboard');
  });
});