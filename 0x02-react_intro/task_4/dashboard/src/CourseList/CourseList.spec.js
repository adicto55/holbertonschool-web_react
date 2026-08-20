import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList component', () => {
  test('renders 5 rows when courses are provided', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    render(<CourseList courses={courses} />);

    expect(screen.getAllByRole('row')).toHaveLength(5);
  });

  test('renders 3 rows when courses are empty', () => {
    render(<CourseList courses={[]} />);

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(
      screen.getByText('No course available yet')
    ).toBeInTheDocument();
  });
});