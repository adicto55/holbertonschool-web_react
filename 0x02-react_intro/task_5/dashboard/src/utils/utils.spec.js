import {
  getCurrentYear,
  getFooterCopy,
  getLatestNotification,
} from './utils';

describe('utils functions', () => {
  test('getCurrentYear returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
  });

  test('getFooterCopy returns the correct string', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  test('getLatestNotification returns the correct string', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD',
    );
  });
});