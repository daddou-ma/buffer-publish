import React from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from '@bufferapp/ui/Icon';

import {
  CircleColor,
  ColorSwatchesContainer,
  CheckmarkWrapper,
  CircleColorWrapper,
  colorSwatches,
} from '../../styles';

import { getColorContrast } from '../../utils/HexValidations';

const ColorSwatches = ({ colorSelected, onColorChange, onChange }) => (
  <ColorSwatchesContainer>
    {Object.keys(colorSwatches).map(key => (
      <CircleColorWrapper key={key.toString()}>
        <CircleColor
          color={colorSwatches[key]}
          colorContrast={getColorContrast(colorSwatches[key])}
          onClick={() => onColorChange(colorSwatches[key], onChange)}
          selectable
          aria-label={`link color ${key}`}
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
  onColorChange: PropTypes.func,
  colorSelected: PropTypes.string,
};

ColorSwatches.defaultProps = {
  onChange: () => {},
  onColorChange: () => {},
  colorSelected: '',
};

export default ColorSwatches;
