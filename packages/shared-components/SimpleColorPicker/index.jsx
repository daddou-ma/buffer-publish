import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { SimpleColorSwatch } from '@bufferapp/publish-shared-components';

const ColorPickerContainer = styled.div`
  display: flex;
  margin: 16px 0 24px;

  *:not(:last-child) {
    margin-right: 10px;
  }
`;

const SimpleColorPicker = ({ colors, colorSelected, onColorClick }) => (
  <ColorPickerContainer>
    {colors.map(item => {
      const isColorSelected = colorSelected === item.color;
      return (
        <SimpleColorSwatch
          key={uuid()}
          color={item.color}
          colorName={item.colorName}
          selected={isColorSelected}
          onColorClick={() => onColorClick(item.color)}
        />
      );
    })}
  </ColorPickerContainer>
);

SimpleColorPicker.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      colorName: PropTypes.string.isRequired,
    })
  ).isRequired,
  colorSelected: PropTypes.string,
  onColorClick: PropTypes.func.isRequired,
};

SimpleColorPicker.defaultProps = {
  colorSelected: '',
};

export default SimpleColorPicker;
