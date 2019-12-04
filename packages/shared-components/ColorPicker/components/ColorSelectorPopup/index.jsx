import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from '@bufferapp/ui/Input';
import ColorSwatches from '../ColorSwatches';

import {
  ColorPopup,
  ColorContainer,
  ColorInputWrapper,
  ColorInput,
  InputWrapper,
  DEFAULT_COLOR,
} from '../../styles';

import { isHexValid, getValidHex } from '../../utils/HexValidations';

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

const ColorSelectorPopup = ({
  left,
  colorSelected,
  isValidHex,
  setIsValidHex,
  onBlur,
  onChange,
  onColorChange,
}) => {
  const containerEl = useRef(null);
  const ref = useRef();
  const [lastValidColor, setLastValidColor] = useState(
    colorSelected || DEFAULT_COLOR
  );

  useOutsideClick(ref, () => {
    onBlur();
  });

  const onColorSelectionChange = colorSelected => {
    onColorChange(colorSelected, onChange);
    setLastValidColor(colorSelected);
  };

  return (
    <ColorPopup ref={ref} left={left}>
      <ColorSwatches
        onChange={onChange}
        onColorChange={color => {
          onColorSelectionChange(color);
        }}
        colorSelected={colorSelected}
      />
      <ColorContainer>
        <ColorInputWrapper color={colorSelected}>
          <ColorInput
            ref={containerEl}
            type="color"
            value={colorSelected}
            id="colorWheel"
            onChange={e => {
              onColorSelectionChange(e.target.value);
            }}
          />
        </ColorInputWrapper>
        <InputWrapper>
          <Input
            type="input"
            prefix={{ text: '#', paddingLeft: '18px' }}
            onChange={e => {
              const isValidColor = isHexValid(e.target.value);
              setIsValidHex(isValidColor);
              onColorChange(e.target.value, onChange);
            }}
            value={colorSelected.replace('#', '')}
            name="colorInput"
            disabled={false}
            hasError={!isValidHex}
            onBlur={() => {
              if (!isValidHex) {
                const selectedHex = getValidHex(colorSelected, lastValidColor);
                onColorSelectionChange(selectedHex);
                setIsValidHex(true);
              }
            }}
            maxLength="6"
          />
        </InputWrapper>
      </ColorContainer>
    </ColorPopup>
  );
};

ColorSelectorPopup.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onColorChange: PropTypes.func,
  setIsValidHex: PropTypes.func,
  colorSelected: PropTypes.string,
  isValidHex: PropTypes.bool,
  left: PropTypes.number,
};

ColorSelectorPopup.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  setIsValidHex: () => {},
  onColorChange: () => {},
  colorSelected: '',
  isValidHex: true,
  left: 0,
};

export default ColorSelectorPopup;
