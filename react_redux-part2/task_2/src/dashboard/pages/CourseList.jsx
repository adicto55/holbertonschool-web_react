import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow/CourseListRow';
import { selectCourse, unSelectCourse, fetchCourses } from '../features/courses/courseSlice';

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses || []);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  // 1. Create onChangeRow function
  const onChangeRow = (id, checked) => {
    if (checked) {
      dispatch(selectCourse(id));
    } else {
      dispatch(unSelectCourse(id));
    }
  };

  return (
    <table className={css(styles.table)} id="CourseList">
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
        {courses.length === 0 ? (
          <CourseListRow textFirstCell="No course available yet" isHeader={false} />
        ) : (
          courses.map((course) => (
            <CourseListRow
              key={course.id}
              id={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isHeader={false}
              isChecked={course.isSelected} // Pass isChecked
              onChangeRow={onChangeRow}     // Pass onChangeRow
            />
          ))
        )}
      </tbody>
    </table>
  );
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
    border: '1px solid #e1484c',
    borderCollapse: 'collapse',
    marginTop: '2rem',
  },
});

export default CourseList;
