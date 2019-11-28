import { DEFAULT_COLOR } from '../styles';

export const getColorContrast = hex => {
  const hexColor = hex.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 160 ? '#000000' : '#ffffff';
};

const MAX_HEX_LENGTH = 6;

export const onColorChange = (hexColor, onChange, isValidHex = true) => {
  let selectedHex = hexColor.replace('#', '');
  if (!isValidHex) {
    const shouldRepeat = selectedHex.length > 0 && selectedHex.length <= 3;
    const repeatBy = MAX_HEX_LENGTH / selectedHex.length;
    selectedHex = shouldRepeat ? selectedHex.repeat(repeatBy) : DEFAULT_COLOR;
  } else {
    selectedHex = hexColor;
  }

  const selectedColor = (selectedHex.charAt(0) !== '#'
    ? `#${selectedHex}`
    : selectedHex
  ).toUpperCase();
  const textColor = getColorContrast(selectedColor);

  if (typeof onChange === 'function') {
    onChange(selectedColor, textColor);
  }
};

export const isHexValid = hex => /^#[0-9A-F]{6}$/i.test(`#${hex}`);
