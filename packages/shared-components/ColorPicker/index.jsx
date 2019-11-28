import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import Button from '@bufferapp/ui/Button';
import {
  ColorPickerWrapper,
  CircleColor,
  ColorSelectorWrapper,
  DEFAULT_COLOR,
} from './styles';

import ColorSelectorPopup from './components/ColorSelectorPopup';
import { getColorContrast, onColorChange } from './utils/HexValidations';

const ColorPicker = ({ onChange, label, defaultColor, onBlur }) => {
  const [color, setColor] = useState(defaultColor || DEFAULT_COLOR);
  const [visible, setVisible] = useState(false);
  const [isValidHex, setIsValidHex] = useState(true);

  return (
    <ColorPickerWrapper>
      <Text type="label">{label}</Text>
      <ColorSelectorWrapper>
        <Button
          label={color}
          type="secondary"
          icon={<CircleColor color={color} selectable={false} />}
          onClick={() => {
            const newVisible = !visible;
            setVisible(!visible);
            if (newVisible === false && onBlur) {
              onBlur(color, getColorContrast(color));
            }
          }}
          onBlur={() => {
            setVisible(false);
            if (onBlur) onBlur(color, getColorContrast(color));
          }}
        />
        {visible && (
          <ColorSelectorPopup
            onColorChange={onColorChange}
            colorSelected={color}
            onChange={newColor => {
              setColor(newColor);
              onColorChange(newColor, onChange);
            }}
            isValidHex={isValidHex}
            setIsValidHex={setIsValidHex}
            onBlur={() => {
              setVisible(false);
              if (onBlur) onBlur(color, getColorContrast(color));
            }}
          />
        )}
      </ColorSelectorWrapper>
    </ColorPickerWrapper>
  );
};

ColorPicker.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.string,
  defaultColor: PropTypes.string,
};

ColorPicker.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  label: '',
  defaultColor: '',
};

export default ColorPicker;
