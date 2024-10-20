import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Add })).toBe(2);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -1, b: 1, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: 1.5, b: 0.5, action: Action.Add })).toBe(2);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 100, action: Action.Subtract })).toBe(
      0,
    );
    expect(simpleCalculator({ a: 0, b: 10, action: Action.Subtract })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: -10, b: 10, action: Action.Subtract })).toBe(
      -20,
    );
    expect(simpleCalculator({ a: -10, b: -10, action: Action.Subtract })).toBe(
      0,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 6, b: -2, action: Action.Multiply })).toBe(
      -12,
    );
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Multiply })).toBe(25);
    expect(simpleCalculator({ a: -3, b: -6, action: Action.Multiply })).toBe(
      18,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 8, b: -4, action: Action.Divide })).toBe(-2);
    expect(simpleCalculator({ a: -10, b: -2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Exponentiate })).toBe(
      100,
    );
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate })).toBe(
      16,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
    expect(simpleCalculator({ a: 33, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: 'Action.Ad' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 1, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 1, b: '1', action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: '1', b: '1', action: Action.Add })).toBeNull();
  });
});
