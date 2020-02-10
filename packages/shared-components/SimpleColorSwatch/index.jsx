import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, blue, transparent } from '@bufferapp/ui/style/colors';
import { Checkmark } from '@bufferapp/ui/Icon';

const Circle = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0px;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: ${white};
  border: ${props => `1px solid ${props.color}`};
  box-sizing: border-box;
  cursor: ${props => (props.selected ? 'auto' : 'pointer')};
  :hover {
    :after {
      display: ${props => (props.selected ? 'none' : 'block')};
      content: '';
      width: 40px;
      height: 38px;
      border: ${props => `1px solid ${props.selected ? transparent : blue}`};
      border-radius: 50%;
      margin: -5px;
    }
  }
`;

const Label = styled.label`
  height: 32px;
`;

const ColorInput = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
  display: block;
  &:focus ~ ${Circle} {
    outline: 1px dotted ${blue};
    outline: 5px auto ${blue};
  }
`;

const CheckmarkWrapper = styled.div`
  position: absolute;
  display: flex;
`;

const SimpleColorSwatch = ({ color, colorName, selected, onColorClick }) => (
  <Label htmlFor={colorName}>
    <ColorInput
      type="radio"
      id={colorName}
      name="colorPicker"
      value={color}
      aria-label={`color ${colorName}`}
      checked={selected}
      onChange={onColorClick}
    />
    <Circle color={color} selected={selected}>
      {selected && (
        <CheckmarkWrapper>
          <Checkmark />
        </CheckmarkWrapper>
      )}
    </Circle>
  </Label>
);

SimpleColorSwatch.propTypes = {
  selected: PropTypes.bool,
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  onColorClick: PropTypes.func.isRequired,
};

SimpleColorSwatch.defaultProps = {
  selected: false,
};

export default SimpleColorSwatch;
