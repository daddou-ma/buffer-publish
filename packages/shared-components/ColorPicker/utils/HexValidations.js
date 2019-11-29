import { DEFAULT_COLOR } from '../styles';

export const getColorContrast = hex => {
  const hexColor = hex.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 160 ? '#000000' : '#ffffff';
};

export const isHexValid = hex => /^#[0-9A-F]{6}$/i.test(hex);

export const repeatInputHex = (selectedHex, repeatBy) => {
  const repeatedHex = `#${selectedHex.repeat(repeatBy)}`;
  return isHexValid(repeatedHex) ? repeatedHex : DEFAULT_COLOR;
};

const MAX_HEX_LENGTH = 6;

export const getValidHex = hexColor => {
  let result = hexColor.replace('#', '');

  if (!isHexValid(hexColor)) {
    const shouldRepeat = result.length > 0 && result.length <= 3;
    const repeatBy = MAX_HEX_LENGTH / result.length;
    result = shouldRepeat ? repeatInputHex(result, repeatBy) : DEFAULT_COLOR;
  } else {
    result = hexColor;
  }

  return result;
};

export const onColorChange = (selectedHex, onChange) => {
  const selectedColor = (selectedHex.charAt(0) !== '#'
    ? `#${selectedHex}`
    : selectedHex
  ).toUpperCase();
  const textColor = getColorContrast(selectedColor);

  if (typeof onChange === 'function') {
    onChange(selectedColor, textColor);
  }
};
