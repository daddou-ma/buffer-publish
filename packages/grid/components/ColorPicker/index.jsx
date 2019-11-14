import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import Input from '@bufferapp/ui/Input';
import { Checkmark } from '@bufferapp/ui/Icon';
import {
  ColorWrapper,
  ColorSelectorWrapper,
  CircleColor,
  ColorSelector,
  ColorContainer,
  ColorInputWrapper,
  ColorInput,
  InputWrapper,
  ColorSwatchesContainer,
  CheckmarkWrapper,
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
    <CircleColor
      color={colorSwatches[key]}
      onClick={() => setColor(colorSwatches[key])}
      selectable
    >
      {colorSelected === colorSwatches[key] && <CheckIcon />}
    </CircleColor>
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

const LinkSelector = ({ color, setColor, isValidHex, setIsValidHex }) => {
  const containerEl = useRef(null);

  return (
    <ColorSelector>
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
    </ColorSelector>
  );
};

const ColorPicker = () => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [isValidHex, setIsValidHex] = useState(true);

  return (
    <ColorWrapper>
      <Text type="label">Link Color</Text>
      <ColorSelectorWrapper>
        <CircleColor color={color} selectable={false} />
        <Text color="grayDark" type="p">
          {color}
        </Text>
        <LinkSelector
          color={color}
          setColor={setColor}
          isValidHex={isValidHex}
          setIsValidHex={setIsValidHex}
        />
      </ColorSelectorWrapper>
    </ColorWrapper>
  );
};

export default ColorPicker;
