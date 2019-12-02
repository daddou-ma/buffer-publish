import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import {
  ColorPickerWrapper,
  ColorPreview,
  StyledButton,
  ColorSelectorWrapper,
  ButtonWrapper,
  DEFAULT_COLOR,
} from './styles';

import ColorSelectorPopup from './components/ColorSelectorPopup';
import { getColorContrast, onColorChange } from './utils/HexValidations';

const useLayoutSize = callback => {
  const handleResize = () => {
    const newLeft = window.innerWidth <= 1221 ? -67 : 0;
    callback(newLeft);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
};

const ColorPicker = ({ onChange, label, defaultColor, onBlur }) => {
  const [color, setColor] = useState(defaultColor || DEFAULT_COLOR);
  const [visible, setVisible] = useState(false);
  const [isValidHex, setIsValidHex] = useState(true);

  const [left, setLeft] = useState(0);
  const targetRef = useRef();
  useLayoutSize(setLeft);

  return (
    <ColorPickerWrapper>
      <Text type="label">{label}</Text>
      <ColorSelectorWrapper ref={targetRef}>
        <ButtonWrapper>
          <StyledButton
            label={color}
            type="secondary"
            fullWidth
            icon={<ColorPreview color={color} />}
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
        </ButtonWrapper>
        {visible && (
          <ColorSelectorPopup
            left={left}
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
