import React from 'react';
import { shallow } from 'enzyme';
import * as reactRedux from 'react-redux';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseList from './CourseList';
import { selectCourse, unSelectCourse } from '../features/courses/courseSlice';

describe('<CourseList />', () => {
  let useSelectorMock;
  let useDispatchMock;
  let dispatchMock;

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    useSelectorMock.mockReturnValue([]);
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it('dispatches selectCourse when onChangeRow is called with true', () => {
    useSelectorMock.mockReturnValue([{ id: '1', name: 'ES6', credit: 60, isSelected: false }]);
    const wrapper = shallow(<CourseList />);
    
    // First two elements are Headers, the third is our data row
    const row = wrapper.find('CourseListRow').at(2); 
    row.prop('onChangeRow')('1', true);
    
    expect(dispatchMock).toHaveBeenCalledWith(selectCourse('1'));
  });

  it('dispatches unSelectCourse when onChangeRow is called with false', () => {
    useSelectorMock.mockReturnValue([{ id: '2', name: 'Webpack', credit: 20, isSelected: true }]);
    const wrapper = shallow(<CourseList />);
    
    const row = wrapper.find('CourseListRow').at(2);
    row.prop('onChangeRow')('2', false);
    
    expect(dispatchMock).toHaveBeenCalledWith(unSelectCourse('2'));
  });
});
