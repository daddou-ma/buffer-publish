import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';
import { Checkmark } from '@bufferapp/ui/Icon';
import Button from '@bufferapp/ui/Button';
import {
  ColorPickerWrapper,
  CircleColor,
  ColorSelectorWrapper,
  ColorPopup,
  ColorContainer,
  ColorInputWrapper,
  ColorInput,
  InputWrapper,
  ColorSwatchesContainer,
  CheckmarkWrapper,
  CircleColorWrapper,
  colorSwatches,
  DEFAULT_COLOR,
} from './styles';

const isHexValid = hex => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
};

const ColorSwatches = ({ colorSelected, onChange }) => (
  <ColorSwatchesContainer>
    {Object.keys(colorSwatches).map(key => (
      <CircleColorWrapper>
        <CircleColor
          color={colorSwatches[key]}
          onClick={() => onChange(colorSwatches[key])}
          selectable
        >
          {colorSelected === colorSwatches[key] && (
            <CheckmarkWrapper>
              <Checkmark />
            </CheckmarkWrapper>
          )}
        </CircleColor>
      </CircleColorWrapper>
    ))}
  </ColorSwatchesContainer>
);

ColorSwatches.propTypes = {
  onChange: PropTypes.func,
  colorSelected: PropTypes.string,
};

ColorSwatches.defaultProps = {
  onChange: () => {},
  colorSelected: '',
};

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

const ColorSelectorPopup = ({
  colorSelected,
  isValidHex,
  setIsValidHex,
  onBlur,
  onChange,
}) => {
  const containerEl = useRef(null);
  const ref = useRef();

  useOutsideClick(ref, () => {
    onBlur();
  });

  return (
    <ColorPopup ref={ref}>
      <ColorSwatches onChange={onChange} colorSelected={colorSelected} />
      <ColorContainer>
        <ColorInputWrapper color={colorSelected}>
          <ColorInput
            ref={containerEl}
            type="color"
            value={colorSelected}
            id="colorWheel"
            onChange={event => onChange(event.target.value)}
          />
        </ColorInputWrapper>
        <InputWrapper>
          <Input
            type="input"
            onChange={e => {
              onChange(e.target.value);
              setIsValidHex(isHexValid(e.target.value));
            }}
            value={colorSelected}
            name="colorInput"
            disabled={false}
            hasError={!isValidHex}
            onBlur={() => {
              if (!isValidHex) {
                onChange(DEFAULT_COLOR);
                setIsValidHex(true);
              }
            }}
            maxLength="7"
          />
        </InputWrapper>
      </ColorContainer>
    </ColorPopup>
  );
};

ColorSelectorPopup.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  setIsValidHex: PropTypes.func,
  colorSelected: PropTypes.string,
  isValidHex: PropTypes.bool,
};

ColorSelectorPopup.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  setIsValidHex: () => {},
  colorSelected: '',
  isValidHex: true,
};

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
          onClick={() => setVisible(!visible)}
          onBlur={() => setVisible(false)}
        />
        {visible && (
          <ColorSelectorPopup
            colorSelected={color}
            onChange={newColor => {
              setColor(newColor);
              onChange(newColor);
            }}
            isValidHex={isValidHex}
            setIsValidHex={setIsValidHex}
            onBlur={() => {
              setVisible(false);
              if (onBlur) onBlur();
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
