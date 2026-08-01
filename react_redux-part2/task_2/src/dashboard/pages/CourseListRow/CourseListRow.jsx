import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const CourseListRow = ({ isHeader, textFirstCell, textSecondCell, isChecked, onChangeRow, id }) => {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={css(styles.rowHeader)}>
          <th colSpan="2">{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr className={css(styles.rowHeader)}>
          <th>{textFirstCell}</th>
          <th>{textSecondCell}</th>
        </tr>
      );
    }
  }

  // Checkbox added for body rows
  return (
    <tr className={css(styles.rowBody, isChecked && styles.rowChecked)}>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChangeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isChecked: PropTypes.bool,
  onChangeRow: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
  isChecked: false,
  onChangeRow: () => {},
  id: null,
};

const styles = StyleSheet.create({
  rowHeader: {
    backgroundColor: '#deb5b545',
  },
  rowBody: {
    backgroundColor: '#f5f5f5ab',
  },
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
});

export default CourseListRow;
