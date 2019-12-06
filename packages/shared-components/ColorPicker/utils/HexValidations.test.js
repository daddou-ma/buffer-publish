import {
  getColorContrast,
  isHexValid,
  repeatInputHex,
  getValidHex,
} from './HexValidations';

describe('HexValidations Utils', () => {
  it('returns contrast color', () => {
    const hexContrast = getColorContrast('#000000').toUpperCase();
    expect(hexContrast).toEqual('#FFFFFF');
  });

  it('returns if hex is valid', () => {
    const hexContrast = isHexValid('#BEBEBE');
    expect(hexContrast).toBe(true);
  });
  it('returns invalid for non hex values', () => {
    const hexContrast = isHexValid('RED');
    expect(hexContrast).toBe(false);
  });

  it('checks if repeated value is valid', () => {
    const repeatValue = repeatInputHex('1', 6);
    const hexContrast = isHexValid(repeatValue);
    expect(hexContrast).toBe(true);
  });

  it('returns repeated value', () => {
    const repeatValue = repeatInputHex('1', 6);
    expect(repeatValue).toEqual('#111111');
  });

  it('returns same hex code when is valid', () => {
    const validHex = getValidHex('#BEBEBE');
    expect(validHex).toEqual('#BEBEBE');
  });

  it('returns a valid hex code when a single character is found', () => {
    const repeatValue = getValidHex('1');
    expect(repeatValue).toEqual('#111111');
  });

  it('returns a valid hex code when two characters are found', () => {
    const repeatValue = getValidHex('AB');
    expect(repeatValue).toEqual('#ABABAB');
  });

  it('returns a valid hex code when three characters are found', () => {
    const repeatValue = getValidHex('ABC');
    expect(repeatValue).toEqual('#ABCABC');
  });

  it('returns last valid hex when invalid input found', () => {
    const lastValidColor = '#EB002E';
    const validHex = getValidHex('!!', lastValidColor);
    expect(validHex).toEqual(lastValidColor);
  });
});
