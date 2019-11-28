export const getColorContrast = hex => {
  const hexColor = hex.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 160 ? '#000000' : '#ffffff';
};

export const onColorChange = (hexColor, onChange) => {
  const selectedColor = hexColor.charAt(0) !== '#' ? `#${hexColor}` : hexColor;
  const textColor = getColorContrast(selectedColor);

  if (typeof onChange === 'function') {
    onChange(selectedColor, textColor);
  }
};

export const isHexValid = hex => /^#[0-9A-F]{6}$/i.test(`#${hex}`);
