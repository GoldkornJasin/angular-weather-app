import roundNumber from './roundNumber';

describe('roundNumber function', () => {
  it('rounds a number to 0 decimal places', () => {
    expect(roundNumber(1.2345, 0)).toBe(1);
    expect(roundNumber(1.4, 0)).toBe(1);
    expect(roundNumber(1.5, 0)).toBe(2);
    expect(roundNumber(1.6, 0)).toBe(2);
  });

  it('rounds a number to 1 decimal place', () => {
    const result = roundNumber(1.2345, 1);
    expect(result).toBe(1.2);
  });

  it('rounds a number to 2 decimal places', () => {
    const result = roundNumber(1.2345, 2);
    expect(result).toBe(1.23);
  });

  it('rounds a number to 3 decimal places', () => {
    const result = roundNumber(1.2345, 3);
    expect(result).toBe(1.234);
  });
});
