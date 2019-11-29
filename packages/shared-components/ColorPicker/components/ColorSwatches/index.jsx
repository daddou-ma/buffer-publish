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

const ColorSwatches = ({ colorSelected, onColorChange, onChange }) => (
  <ColorSwatchesContainer>
    {Object.keys(colorSwatches).map(key => (
      <CircleColorWrapper key={key.toString()}>
        <CircleColor
          color={colorSwatches[key]}
          onClick={() => onColorChange(colorSwatches[key], onChange)}
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
  onColorChange: PropTypes.func,
  colorSelected: PropTypes.string,
};

ColorSwatches.defaultProps = {
  onChange: () => {},
  onColorChange: () => {},
  colorSelected: '',
};

export default ColorSwatches;
