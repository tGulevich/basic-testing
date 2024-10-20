import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 1, action: Action.Add, expected: 2 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },
  { a: -1, b: 1, action: Action.Add, expected: 0 },
  { a: 1.5, b: 0.5, action: Action.Add, expected: 2 },
  { a: 100, b: 100, action: Action.Subtract, expected: 0 },
  { a: 0, b: 10, action: Action.Subtract, expected: -10 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 6, b: -2, action: Action.Multiply, expected: -12 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: -3, b: -6, action: Action.Multiply, expected: 18 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 8, b: -4, action: Action.Divide, expected: -2 },
  { a: -10, b: -2, action: Action.Divide, expected: 5 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 33, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 3, action: 'Add', expected: null },
  { a: '1', b: 1, action: Action.Add, expected: null },
  { a: 1, b: '1', action: Action.Add, expected: null },
  { a: '1', b: '1', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({ a, b, action })',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
