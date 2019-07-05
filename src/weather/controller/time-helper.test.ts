import { isRequestForDay, isRequestForMonth } from './time-helper';

test('isRequestForDay with 1994-04-18', () => {
  expect(isRequestForDay('1994-04-18')).toBeTruthy();
});

test('isRequestForDay with 1994-04', () => {
  expect(isRequestForDay('1994-04')).toBeFalsy();
});

test('isRequestForDay with undefined', () => {
  expect(isRequestForDay(undefined)).toBeFalsy();
});

test('isRequestForMonth with 1994-04', () => {
  expect(isRequestForMonth('1994-04')).toBeTruthy();
});

test('isRequestForMonth with 1994-04-18', () => {
  expect(isRequestForMonth('1994-04-18')).toBeFalsy();
});

test('isRequestForMonth with undefined', () => {
  expect(isRequestForMonth(undefined)).toBeFalsy();
});
