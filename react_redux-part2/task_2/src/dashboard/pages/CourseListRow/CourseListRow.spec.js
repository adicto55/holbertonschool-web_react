import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseListRow from './CourseListRow';

describe('<CourseListRow />', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls onChangeRow with right arguments when checkbox is clicked', () => {
    const onChangeRowMock = jest.fn();
    const wrapper = shallow(
      <CourseListRow 
        textFirstCell="test" 
        id="1" 
        onChangeRow={onChangeRowMock} 
        isChecked={false} 
      />
    );
    
    // Find checkbox and simulate a state change
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.simulate('change', { target: { checked: true } });
    
    expect(onChangeRowMock).toHaveBeenCalledWith('1', true);
  });
});
