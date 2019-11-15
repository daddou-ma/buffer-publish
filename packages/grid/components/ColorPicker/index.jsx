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

const CheckIcon = () => (
  <CheckmarkWrapper>
    <Checkmark />
  </CheckmarkWrapper>
);

const AllColorsSwatches = ({ colorSelected, setColor }) => {
  const colors = Object.keys(colorSwatches).map(key => (
    <CircleColorWrapper>
      <CircleColor
        color={colorSwatches[key]}
        onClick={() => setColor(colorSwatches[key])}
        selectable
      >
        {colorSelected === colorSwatches[key] && <CheckIcon />}
      </CircleColor>
    </CircleColorWrapper>
  ));

  return colors;
};

const ColorSwatches = ({ colorSelected, setColor }) => {
  return (
    <ColorSwatchesContainer>
      <AllColorsSwatches setColor={setColor} colorSelected={colorSelected} />
    </ColorSwatchesContainer>
  );
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
  color,
  setColor,
  isValidHex,
  setIsValidHex,
  onBlur,
}) => {
  const containerEl = useRef(null);
  const ref = useRef();

  useOutsideClick(ref, () => {
    onBlur();
  });

  return (
    <ColorPopup ref={ref}>
      <ColorSwatches setColor={setColor} colorSelected={color} />
      <ColorContainer>
        <ColorInputWrapper color={color}>
          <ColorInput
            ref={containerEl}
            type="color"
            value={color}
            id="colorWheel"
            onChange={event => setColor(event.target.value)}
          />
        </ColorInputWrapper>
        <InputWrapper>
          <Input
            type="input"
            onChange={e => {
              setColor(e.target.value);
              setIsValidHex(isHexValid(e.target.value));
            }}
            value={color}
            name="colorInput"
            disabled={false}
            hasError={!isValidHex}
            onBlur={() => {
              if (!isValidHex) {
                setColor(DEFAULT_COLOR);
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

const ColorPicker = ({ onChange, label, defaultColor, onBlur }) => {
  const [color, setColor] = useState(defaultColor || DEFAULT_COLOR);
  const [visible, setVisible] = useState(false);
  const [isValidHex, setIsValidHex] = useState(true);

  return (
    <ColorPickerWrapper>
      <Text type="label">{label}</Text>
      <ColorSelectorWrapper>
        <Button
          type="secondary"
          icon={<CircleColor color={color} selectable={false} />}
          onClick={() => setVisible(!visible)}
          label={color}
          onBlur={() => setVisible(false)}
        />
        {visible && (
          <ColorSelectorPopup
            color={color}
            setColor={setColor}
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

export default ColorPicker;
