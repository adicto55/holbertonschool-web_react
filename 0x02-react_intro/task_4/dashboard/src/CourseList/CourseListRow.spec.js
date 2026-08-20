import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders one header cell with colspan 2', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader
            textFirstCell="Available courses"
            textSecondCell={null}
          />
        </tbody>
      </table>
    );

    const header = screen.getByRole('columnheader');

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('colspan', '2');
    expect(header).toHaveTextContent('Available courses');
  });

  test('renders two header cells', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
  });

  test('renders two td cells when isHeader is false', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            textFirstCell="ES6"
            textSecondCell="60"
          />
        </tbody>
      </table>
    );

    expect(screen.getByRole('row')).toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });
});