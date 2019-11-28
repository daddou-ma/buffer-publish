import React, { useRef, useEffect } from 'react';
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

import { isHexValid } from '../../utils/HexValidations';

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
  onColorChange,
}) => {
  const containerEl = useRef(null);
  const ref = useRef();

  useOutsideClick(ref, () => {
    onBlur();
  });

  return (
    <ColorPopup ref={ref}>
      <ColorSwatches
        onChange={onChange}
        onColorChange={onColorChange}
        colorSelected={colorSelected}
      />
      <ColorContainer>
        <ColorInputWrapper color={colorSelected}>
          <ColorInput
            ref={containerEl}
            type="color"
            value={colorSelected}
            id="colorWheel"
            onChange={e => onColorChange(e.target.value, onChange)}
          />
        </ColorInputWrapper>
        <InputWrapper>
          <Input
            type="input"
            prefix={{ text: '#', paddingLeft: '18px' }}
            onChange={e => {
              onColorChange(e.target.value, onChange);
              setIsValidHex(isHexValid(e.target.value));
            }}
            value={colorSelected.replace('#', '')}
            name="colorInput"
            disabled={false}
            hasError={!isValidHex}
            onBlur={() => {
              if (!isValidHex) {
                onColorChange(DEFAULT_COLOR, onChange);
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
};

ColorSelectorPopup.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  setIsValidHex: () => {},
  onColorChange: () => {},
  colorSelected: '',
  isValidHex: true,
};

export default ColorSelectorPopup;
