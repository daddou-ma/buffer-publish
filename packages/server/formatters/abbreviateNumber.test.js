import abbreviateNumber from './abbreviateNumber';

describe('number', () => {
  it('should abbreviate number with 1 decimal place', () => {
    const result = abbreviateNumber(1250, 1);
    expect(result).toEqual('1.3k');
  });
  it('should abbreviate number with 2 decimal places', () => {
    const result = abbreviateNumber(1250, 2);
    expect(result).toEqual('1.25k');
  });
  it('should abbreviate number with millions', () => {
    const result = abbreviateNumber(1250000, 2);
    expect(result).toEqual('1.25m');
  });
  it('should abbreviate number with billions', () => {
    const result = abbreviateNumber(1250000000, 2);
    expect(result).toEqual('1.25b');
  });
  it('should abbreviate larger numbers', () => {
    const result = abbreviateNumber(1000000000000000, 0);
    expect(result).toEqual('1000t');
  });
});
