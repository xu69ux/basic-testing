import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 1,
      b: 2,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 1,
      b: 2,
      action: Action.Subtract,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 1,
      b: 2,
      action: Action.Multiply,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(2);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 1,
      b: 2,
      action: Action.Divide,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 1,
      b: 2,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(1);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 1,
      b: 2,
      action: 'invalid',
    };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 'invalid',
      b: 2,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });
});
