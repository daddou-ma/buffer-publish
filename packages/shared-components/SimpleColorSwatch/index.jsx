import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, blue, transparent } from '@bufferapp/ui/style/colors';
import { Checkmark } from '@bufferapp/ui/Icon';

const CheckmarkWrapper = styled.div`
  position: absolute;
  display: flex;
`;

const CircleColor = styled.button`
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
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  :hover {
    :after {
      display: ${props => (props.disabled ? 'none' : 'block')};
      content: '';
      width: 40px;
      height: 38px;
      border: ${props => `1px solid ${props.disabled ? transparent : blue}`};
      border-radius: 50%;
      margin: -5px;
    }
  }
`;

const SimpleColorSwatch = ({ color, colorName, selected, onColorClick }) => (
  <CircleColor
    color={color}
    disabled={selected}
    onClick={() => onColorClick({ color })}
    aria-label={`campaign color ${colorName}`}
  >
    {selected && (
      <CheckmarkWrapper>
        <Checkmark />
      </CheckmarkWrapper>
    )}
  </CircleColor>
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
