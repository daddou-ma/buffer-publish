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

const MAX_HEX_LENGTH = 6;
export const repeatInputHex = (selectedHex, lastValidColor) => {
  const repeatBy = MAX_HEX_LENGTH / selectedHex.length;
  const repeatedHex = `#${selectedHex.repeat(repeatBy)}`;

  return isHexValid(repeatedHex) ? repeatedHex : lastValidColor;
};

export const getValidHex = (hexColor, lastValidColor) => {
  const color = hexColor.replace('#', '');
  const validColor = lastValidColor || DEFAULT_COLOR;

  if (!isHexValid(hexColor)) {
    const shouldRepeat = color.length > 0 && color.length <= 3;
    return shouldRepeat ? repeatInputHex(color, validColor) : validColor;
  }

  return hexColor;
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
